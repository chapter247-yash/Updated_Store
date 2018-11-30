import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(authRoutes),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
