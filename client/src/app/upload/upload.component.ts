import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {

    selectedFile!: File;
    message = "";

    constructor(private UploadService: UploadService) { }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    Upload() {
        if (!this.selectedFile) {
            this.message = "Please select a file!";
            return;
        }

        this.UploadService.uploadFile(this.selectedFile).subscribe({
            next: (res) => {
                this.message = "Upload successful!";
                console.log(res);
            },
            error: (err) => {
                this.message = "Upload failed!";
                console.error(err);
            }
        });
    }
}
