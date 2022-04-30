import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-file-to-upload',
  templateUrl: './single-file-to-upload.component.html',
  styleUrls: ['./single-file-to-upload.component.css']
})
export class SingleFileToUploadComponent implements OnInit {
  faTrash = faTrash;

  constructor() { }

  @Input() file! : File;
  @Input() fileIndex! : number;
  @Output() deleteAttachment = new EventEmitter<number>();

  ngOnInit(): void {
  }

  deleteFile() {
    this.deleteAttachment.emit(this.fileIndex);
  }
}

