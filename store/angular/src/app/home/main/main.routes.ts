import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ViewProductComponent } from './view-product/view-product.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'addProducts',
        loadChildren: './add-product/add-product.module#AddProductModule'
    },
    {
        path: 'viewProducts',
        component: ViewProductComponent,
    }
]; 