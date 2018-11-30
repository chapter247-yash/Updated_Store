import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
    NgxPaginationModule,
  ],
  declarations: [
    MainComponent,
    ViewProductComponent,
  ]
})

export class MainModule { 

  constructor (){;
    
  }


}

