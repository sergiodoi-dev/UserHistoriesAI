import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, interval, map, Observable, of, switchMap, tap } from 'rxjs';

export interface Task {
  task: string,
  video_id: string
}

export interface HistoryItem {
  video_name: string,
  task_id: string,
  creation_date: string,
  id: string,
}

export interface ProgressItemResult {
  markdown_response: string
}

export interface ProgressItem {
  task_id: string,
  status: string,
  progress: number,
  progress_message: string,
  result: ProgressItemResult
}

export interface EnrichedHistoryItem extends HistoryItem {
  progressItem?: ProgressItem;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://humaker.api.areamovil.com.co/v1/task';
  historyList: BehaviorSubject<HistoryItem[]>;
  public lastUploadedTaskId$ = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) {
    this.historyList = new BehaviorSubject<HistoryItem[]>([]);
  }


  uploadVideo(file: File): Observable<Task> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Task>(`${this.apiUrl}/add`, formData).pipe(
      tap(response => this.lastUploadedTaskId$.next(response.task))
    );
  }

  /* getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/list`).pipe(
      map(response => {
        let sorted = response.sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
        this.historyList.next(sorted);
        return sorted;
      })
    );
  } */

  getHistory(): Observable<EnrichedHistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/list`).pipe(
      switchMap((historyItems) => {
        const sorted = historyItems.sort((a, b) =>
          new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()
        );

        // Traer cada progreso individual
        const enrichedObservables = sorted.map(item =>
          this.getItem(item.task_id).pipe(
            map(progress => ({ ...item, progressItem: progress }))
          )
        );

        // Espera todos los observables antes de emitir
        return forkJoin(enrichedObservables);
      }),
      tap((enrichedList) => this.historyList.next(enrichedList))
    );
  }

  getItem(task_id: string): Observable<ProgressItem> {
    return this.http.get<ProgressItem>(`${this.apiUrl}/status/${task_id}`);
  }
}
