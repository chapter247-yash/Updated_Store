import { Routes } from '@angular/router';

export const appMainRoutes: Routes = [
    {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'main',
        loadChildren: './home/home.module#HomeModule'
    },
];