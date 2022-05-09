import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ifile } from './ifile';
// @ts-ignore
import * as alertify from 'alertifyjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  map = new Map<string, string>([
    [ "txt", "txt" ],
    [ "jpg", "image" ],
    [ "jpeg", "image" ],
    [ "png", "image" ],
    [ "xls", "excel" ],
    [ "xlsx", "excel" ],
    [ "pdf", "pdf" ],
    [ "amr", "audio" ],
    [ "wav", "audio" ],
    [ "mp3", "audio" ],
    [ "mp4", "video" ],
    [ "mov", "video" ],
    [ "zip", "archive" ],
    [ "rar", "archive" ],
    [ "doc", "word" ],
    [ "docx", "word" ],
    [ "pptx", "power-point"],
]);

  constructor(public http: HttpClient) { 
    alertify.set('notifier', 'delay', 2);
  }

  getIconClassByExtension(extension : string) {
    let iconClass = this.map.get(extension);
    if (iconClass == null) {
      return "file";
    } 
    return iconClass;
  }

  uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => { 
      formData.append("uploadFiles", file); 
    });

    let name = localStorage.getItem('token');
    let paramss = new HttpParams();
    paramss.append("userName", name as string);

    return this.http.post<any>(environment.serverUrl + "/api/upload/" + name,
    formData, {withCredentials: true, reportProgress: true});
  }

  getFiles() {
    return this.http.get<Ifile[]>(environment.serverUrl + "/api/file", 
                                  {withCredentials: true, reportProgress: true});
  }

  downloadFile(file : Ifile) {
    return this.http.post(environment.serverUrl + "/api/download",
                   file, {withCredentials: true,responseType: 'blob'})
  }

  deleteFile(file : Ifile) {
    return this.http.post<any>(environment.serverUrl + "/api/delete",
                  file, {withCredentials: true, reportProgress: true});
  }
}
