import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarkdownModule, MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-history-detail',
  imports: [
    MatDialogModule,
    MarkdownModule,
  ],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.scss'
})
export class HistoryDetailComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  markdown: string | undefined;

  constructor(private mdService: MarkdownService){}

  async ngOnInit()  {
    this.markdown = this.mdService.parse(this.data).toString();
  }

}
