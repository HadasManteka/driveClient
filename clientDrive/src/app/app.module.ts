import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SingleFileComponent } from './single-file/single-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopupFileDialogComponent } from './popup-file-dialog/popup-file-dialog.component';
import { AllFilesComponent } from './all-files/all-files.component';
import {NgxFilesizeModule} from 'ngx-filesize';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SingleFileToUploadComponent } from './single-file-to-upload/single-file-to-upload.component';
import { AuthenticatGuard } from './authenticat.guard';
import { RegisterComponent } from './register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingleFileComponent,
    UploadFileComponent,
    NavbarComponent,
    PopupFileDialogComponent,
    AllFilesComponent,
    SingleFileToUploadComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFilesizeModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthenticatGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
