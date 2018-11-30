import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { TinymceModule } from 'angular2-tinymce';
import { ColorPickerModule } from 'ngx-color-picker';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { appProductRoutes } from './add-product.routes';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SizePriceComponent } from './size-price/size-price.component';
import { ColorImageComponent } from './color-image/color-image.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './add-product.component';
// import { CKEditorModule } from 'ngx-ckeditor';
import { EmailEditorModule } from '../../../../../projects/email-editor/src/public_api';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@NgModule({
  imports: [  
    CommonModule,
    RouterModule.forChild(appProductRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    CKEditorModule,
    TinymceModule.withConfig({}),
    ColorPickerModule,
    AngularDualListBoxModule,
    EmailEditorModule
  ],
  declarations: [ProductInfoComponent, SizePriceComponent, ColorImageComponent, CategoryComponent,AddProductComponent]
})
export class AddProductModule {
  public Editor = ClassicEditor;
 }

