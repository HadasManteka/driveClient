import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {AllFilesComponent} from './all-files/all-files.component';
import {LoginComponent} from './login/login.component';
import { AuthenticatGuard } from './authenticat.guard';
import {NavbarComponent} from './navbar/navbar.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: 'upload', component: UploadFileComponent, canActivate: [AuthenticatGuard]},
  {path: 'allFiles', component: AllFilesComponent, canActivate: [AuthenticatGuard]},
  {path: 'navbar', component: NavbarComponent, canActivate: [AuthenticatGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/upload', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
