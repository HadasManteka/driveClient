import { Component, OnInit} from '@angular/core';
import { Ifile } from '../ifile';
import {FileServiceService} from '../file-service.service';
import {faSearch, faFileWord, faFileExcel, faFilePdf, faFileImage, faFile, faFileAlt, 
        faFileAudio, faFileVideo, faFileArchive, faFilePowerpoint} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
  faSearch = faSearch;

  pageIndex : number = 0;
  searchText! : string;
  loader : boolean = false;
  public filesInServer! : Ifile[];
  public filteredFiles : Ifile[] = [];
  public clickedFile! : Ifile;
  public doesClicked = false;
  constructor(private fileService : FileServiceService) { }

  ngOnInit(): void {
    alertify.set('notifier', 'delay', 2);
    this.loadFiles();
  }

  loadFiles() : void {
    this.loader = true;
    this.fileService.getFiles()
    .subscribe({
      next:(res: Ifile[]) => {
        this.loader = false;
        this.filesInServer = res; 
        this.filesExtensions();
        this.filteredFiles = this.filesInServer;
    }, 
    error:(err) => {
      if (err.status == 0) {
        alertify.error("server error!");
    } else {
        alertify.error("cant load the files");
      }
      this.loader = false;
    }});
  }

  getIconsClass(extension : string) : string{
    return this.fileService.getIconClassByExtension(extension.toLowerCase());
  }

  filesExtensions() {
    this.filesInServer.filter(file => { 
          file.extension = file.fileName.split('.').pop() as string;
    });
  }
  
 filter() {
    if (this.searchText != "") {
      this.pageIndex = 0;
      this.filteredFiles = this.filesInServer.filter(file => 
        file.fileName.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.filteredFiles = this.filesInServer;
    }
  }

  showModalDetails(file: Ifile) : void{
    this.clickedFile = file;
    this.doesClicked = true;
  }

  closePopup() : void {
    this.doesClicked = false;
  }

  deleteFile() : void {
    this.filesInServer = this.filesInServer.filter(file => file.id !== this.clickedFile.id);
    this.filteredFiles = this.filteredFiles.filter(file => file.id !== this.clickedFile.id);
  }

  clickRight() {
    if (this.pageIndex + 16 < this.filteredFiles.length) {
      this.pageIndex += 16;
    }
  }

  clickLeft () {
    if (this.pageIndex >= 16) {
      this.pageIndex -= 16;
    }
  }

  pageAmount() {
    if (this.filteredFiles.length == 0) {
      return 1;
    } else {
      return Math.ceil(this.filteredFiles.length / 16);
    }
  }

  iconByFileExtension(extension : string) {
    switch(extension.toLowerCase()){
      case 'txt':
          return faFileAlt;
      case 'pdf':
          return faFilePdf;
      case 'docx':
      case 'doc':
          return faFileWord;
      case 'xls':
      case 'xlsx':
          return faFileExcel;
      case 'mp3':
      case 'amr':
      case 'wav':
          return faFileAudio;
      case 'mp4':
      case 'mov':
          return faFileVideo;
      case 'zip':
      case 'rar':
          return faFileArchive;
          break;
      case 'pptx':
          return faFilePowerpoint;
      case 'jpg':
      case 'jpeg':
      case 'png':
          return faFileImage;
      default:
         return faFile;
    } 
  }  
}
