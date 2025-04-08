import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, of, switchMap, tap } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://humaker.api.areamovil.com.co/v1/task';

  constructor(private http: HttpClient) {}

  uploadVideo(file: File): Observable<Task> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Task>(`${this.apiUrl}/add`, formData);
  }

  getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/list`);
  }

  getItem(task_id: string): Observable<ProgressItem> {
    return this.http.get<ProgressItem>(`${this.apiUrl}/status/${task_id}`);
  }
}
