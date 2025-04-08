import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFormComponent } from "./modules/video-upload/components/upload-form/upload-form.component";
import { HistoryListComponent } from "./modules/video-history/components/history-list/history-list.component";
import { HistoryItemComponent } from "./modules/video-history/components/history-item/history-item.component";

@Component({
  selector: 'app-root',
  imports: [UploadFormComponent, HistoryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OTTM-app';
}
