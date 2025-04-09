import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';
import { VideoService } from '../../../../core/services/video.service';

@Component({
  selector: 'app-upload-form',
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FileSizePipe,
  ],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.scss'
})
export class UploadFormComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  uploadForm: FormGroup;
  isUploading = false;
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private snackbar: MatSnackBar
  ) {
    this.uploadForm = this.fb.group({
      videoFile: [null, [Validators.required]],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size > 2000 * 1024 * 1024) {
        this.snackbar.open('El video no puede exceder 2GB', 'Cerrar', { duration: 5000 });
        return;
      }
      this.uploadForm.patchValue({ videoFile: file });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      this.isUploading = true;
      const { videoFile } = this.uploadForm.value;

      this.videoService.uploadVideo(videoFile).subscribe({
        next: () => {
          this.isUploading = false;
          this.uploadForm.reset();                         // Limpia el formulario
          this.fileInput.nativeElement.value = '';         // Limpia el input file visualmente
          this.videoService.getHistory().subscribe();      // Recarga el historial
          this.snackbar.open('Video cargado con éxito', 'Cerrar', { duration: 3000 });
        },error: ()=>{
          this.isUploading = false;
          this.snackbar.open('Error al cargar el vídeo', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

}
