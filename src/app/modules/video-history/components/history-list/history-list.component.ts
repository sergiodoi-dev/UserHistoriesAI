import { Component, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HistoryItem, ProgressItem, VideoService } from '../../../../core/services/video.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HistoryItemComponent } from "../history-item/history-item.component";

@Component({
  selector: 'app-history-list',
  imports: [

    MatCardModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTableModule,
    CommonModule,
    HistoryItemComponent
],
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {
  dataSource = new MatTableDataSource<HistoryItem>();
  paginator!: MatPaginator;
  isLoading = true;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.isLoading = true;
    this.videoService.getHistory().subscribe({
      next: (response) => {

        this.dataSource.data = response;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
    
  }


}
