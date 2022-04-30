import { Component, OnInit} from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import {FileServiceService} from '../file-service.service';
import {Response} from '../response';
// @ts-ignore
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(private fileService : FileServiceService) { 
    alertify.set('notifier', 'delay', 3);
  }

  ngOnInit(): void {
  }

  loader: boolean = false;
  public files: File[] = [];
 
  public dropped(moreFiles: NgxFileDropEntry[]) {

    for (const droppedFile of moreFiles) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
 
        // Add the file to the list
        fileEntry.file((file: File) => {
          if (file.size > 1024 * 1024 * 50) {
            alertify.error("'" + file.name + "' is too big");
          } else {
            this.files.push(file);
          }
        });
      }
    }
  }
 
  sizeSum() : number{
    let sumOfSize : number = 0;

    this.files.filter(file => { 
      sumOfSize += file.size;
    });

    return sumOfSize;
  }

  upload(): void {
    if (this.sizeSum() > 1024 * 1024 * 100) {
      alertify.error("You can upload only 100MB each time");
    }
    else if (this.files.length > 0) {
      this.loader = true;
      this.fileService.uploadFiles(this.files)
      .subscribe({
        next:(res: Response) => {
          this.loader = false;
          alertify.success(res._message);
        },
        error:(err) => {
          if (err.status == 0) {
            alertify.error("server error");
        } else {
            alertify.error(err.error._message);
          }
          this.loader = false;
        }
      });
      this.files = [];
    }
  }

  deleteAttachment(index: number) : void {
    this.files.splice(index, 1)
  }
}
