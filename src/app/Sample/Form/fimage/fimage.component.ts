import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconServiceService } from '../../Service/icon-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fimage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fimage.component.html',
  styleUrls: ['./fimage.component.css']
})
export class FImageComponent {
  selectedFile: File | null = null;
  iconName: string = '';
  imageUrl: any = null;

  constructor(private iconService: IconServiceService, private sanitizer: DomSanitizer) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadIcon(): void {
    if (this.selectedFile && this.iconName) {
      this.iconService.uploadIcon(this.selectedFile, this.iconName)
        .subscribe(
          response => {
            console.log('Icon uploaded successfully:', response);
          },
          error => {
            console.error('Error uploading icon:', error);
          }
        );
    }
  }

  getIcon(id: string): void {
    this.iconService.getIcon(id)
      .subscribe(
        blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        },
        error => {
          console.error('Error getting icon:', error);
        }
      );
  }
}

