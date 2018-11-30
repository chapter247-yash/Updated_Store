import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { AuthGuard } from '../shared/auth.guard';

export const homeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: "./main/main.module#MainModule"
      },
    ]
  }
];