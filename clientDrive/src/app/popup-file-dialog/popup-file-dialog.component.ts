import { Component, OnInit, Output, Input, EventEmitter, SecurityContext } from '@angular/core';
import { Ifile } from '../ifile';
import { Subject, Observable } from 'rxjs';
import {FileServiceService} from '../file-service.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Response} from '../response';
// @ts-ignore
import * as alertify from 'alertifyjs';
// @ts-ignore
import {saveAs} from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-popup-file-dialog',
  templateUrl: './popup-file-dialog.component.html',
  styleUrls: ['./popup-file-dialog.component.css']
})
export class PopupFileDialogComponent implements OnInit {

  url!: string;
  loader : boolean = false;
  faTrash = faTrash;
  @Input() file! : Ifile;
  @Output() closePopup = new EventEmitter();
  @Output() deleteFileFromArray = new EventEmitter();

  constructor(private fileService : FileServiceService, private sanitizer: DomSanitizer) {
    alertify.set('notifier', 'delay', 2);
   }

  ngOnInit(): void {
    this.url = "";
    if (this.getIconClass() == "image") {
      this.imagePreview();
    }
  }

  getIconClass() {
    return this.fileService.getIconClassByExtension(this.file.extension.toLowerCase());
  }

  imagePreview() {
    
    const reader = new FileReader();
    this.fileService.downloadFile(this.file)
    .subscribe(
      (res) => {
        reader.readAsDataURL(res); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target?.result as string;

          this.sanitizer.sanitize(SecurityContext.HTML,
                                  this.sanitizer.bypassSecurityTrustHtml(this.url));
        }
      });
  }

  close(): void {
    this.url = "";
    this.closePopup.emit();
  }

  download() {
    this.loader = true;
    this.fileService.downloadFile(this.file)
    .subscribe(
      (res  ) => {
        // alert(res.type);   
        this.loader = false;
        alertify.success("download success");
        const blob = new Blob([res], {type: 'application/octet-stream'});
        saveAs(blob, this.file.fileName);
      },
      (err) => {
          alertify.error("error with download");
          this.loader = false;
      }
    );
  }
  

  deleteFile() {
    this.loader = true;
    this.fileService.deleteFile(this.file)
    .subscribe(
      (res: Response) => {
        this.loader = false;
        this.deleteFileFromArray.emit();
        alertify.success(res._message);
        // this.close();
      },
      (err) => {
        if (err.status == 0) {
          alertify.error("server error!");
      } else {
          alertify.error(err.error._message);
        }

        this.loader = false;
      }
    );
    ;
  }
}
