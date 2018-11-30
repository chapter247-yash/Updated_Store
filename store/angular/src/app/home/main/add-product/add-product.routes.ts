import { Routes } from "@angular/router";
import { CategoryComponent } from "./category/category.component";
import { ColorImageComponent } from "./color-image/color-image.component";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { SizePriceComponent } from "./size-price/size-price.component";
import { AddProductComponent } from './add-product.component';

export const appProductRoutes: Routes = [
  {
    path: "",
    component: AddProductComponent,
    children: [
      {
        path: "",
        redirectTo: "productInfo"
      },
      {
        path: "productInfo",
        component: ProductInfoComponent
      },
      {
        path: "productInfo",
        component: ProductInfoComponent
      },
      {
        path: "size",
        component: SizePriceComponent
      },
      {
        path: "color",
        component: ColorImageComponent
      },
      {
        path: "category",
        component: CategoryComponent
      }
    ]
  },
];
