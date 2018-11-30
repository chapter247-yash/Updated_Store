import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(homeRoutes),
    ToastrModule.forRoot(),
    FormsModule
  ],
  declarations: [
    HomeComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent,
  ],
  exports: [
  ],
  providers: []
})

export class HomeModule { }
