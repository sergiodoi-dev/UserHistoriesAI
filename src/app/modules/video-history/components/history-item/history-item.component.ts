import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  EnrichedHistoryItem,
  HistoryItem,
  ProgressItem,
  VideoService,
} from '../../../../core/services/video.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription, interval, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-history-item',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss',
})
export class HistoryItemComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  /* @Input()
  public historyItem!: HistoryItem; */
  @Input()
  public historyItem!: EnrichedHistoryItem;

  public progressItem: ProgressItem | undefined;

  private pollingSubscription?: Subscription;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    //this.startPollingProgress();
    // Ya viene inyectado el progreso desde el input
    this.progressItem = this.historyItem.progressItem;

    if (this.progressItem?.status !== 'SUCCESS') {
      this.startPollingProgress(); // solo para continuar si aún no ha terminado
    }
  }

  ngOnDestroy(): void {
    this.pollingSubscription?.unsubscribe();
  }

  startPollingProgress(): void {
    this.videoService
      .getItem(this.historyItem.task_id)
      .subscribe((response) => {
        this.progressItem = response;

        if (response.status === 'SUCCESS') return;

        this.pollingSubscription = interval(5000)
          .pipe(
            switchMap(() =>
              this.videoService.getItem(this.historyItem.task_id)
            ),
            tap((resp) => (this.progressItem = resp)),
            takeWhile((resp) => resp.status !== 'SUCCESS', true)
          )
          .subscribe();
      });
  }

  get showViewButton(): boolean {
    return this.progressItem != undefined && this.progressItem.result != null;
  }

  showDescription(description: string): void {
    this.dialog.open(HistoryDetailComponent, {
      data: description,
      maxWidth: '100%',
    });
  }
}
