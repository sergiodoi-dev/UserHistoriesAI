import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HistoryItem, ProgressItem, VideoService } from '../../../../core/services/video.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
export class HistoryItemComponent implements OnInit{
  readonly dialog = inject(MatDialog)

  @Input()
  public historyItem!: HistoryItem;

  public progressItem: ProgressItem | undefined


  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.getProgressItem();
  }

  getProgressItem() {
    //long pulling
    this.videoService.getItem(this.historyItem.task_id).subscribe(response => {
      this.progressItem = response;
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
