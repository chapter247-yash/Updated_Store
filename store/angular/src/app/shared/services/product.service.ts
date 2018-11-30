import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Product } from "../../shared/models/product.model";
import { map } from "rxjs/operators";
import { log } from "util";
import {Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: Product[];
  readonly baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient, private http2: Http) {}

  // postProductImage(body?: any): Observable<any> {
  //   console.log(body)
  //   const formdata = new FormData();
  //   for (const i in body) {
  //     if (typeof body[i] === "object" && body[i] && body[i][0]) {
  //       for (const k in body[i]) {
  //         if (body[i].hasOwnProperty(k)) {
  //           const e = body[i][k];
  //           formdata.append(i + "[]", e);
  //         }
  //       }
  //     } else {
  //       formdata.append(i, body[i]);
  //     }
  //   }
  //   return this.http2
  //     .post("http://localhost:3000/addProductImage", formdata)
  // }

  // postProduct(body?: any) {
  //   console.log(body)
  //   const formdata = new FormData();
  //   for (const i in body) {
  //     if (typeof body[i] === "object" && body[i] && body[i][0]) {
  //       for (const k in body[i]) {
  //         if (body[i].hasOwnProperty(k)) {
  //           const e = body[i][k];
  //           formdata.append(i + "[]", e);
  //         }
  //       }
  //     } else {
  //       formdata.append(i, body[i]);
  //     }
  //   }
  //   return this.http2
  //     .post("http://localhost:3000/addProduct", formdata)
  // }

  postProduct(products:Product) {
    return this.http.post("http://localhost:3000/addProduct",products);
  }

  getProduct() {
    return this.http.get("http://localhost:3000/getProduct");
  }

  getProductSort(sort : string) {
    return this.http.get("http://localhost:3000/getProduct" + `${sort}`);
  }

  getProductById(_id: string) {
    return this.http.get("http://localhost:3000/getProduct" + `/${_id}`);
  }

  getProductByItemNo(itemNo: string) {
    return this.http.get(
      "http://localhost:3000/getProduct/itemno" + `/${itemNo}`
    );
  }

  editProduct(product: Product) {
    return this.http.put(
      "http://localhost:3000/editProduct" + `/${product._id}`,
      product
    );
  }

  editProductByInfo(product: Product) {
    return this.http.put(
      "http://localhost:3000/editProduct/information" + `/${product._id}`,
      product
    );
  }

  editProductByStatus(product) {
    console.log(product._id)  
    return this.http.put(
      "http://localhost:3000/editProduct/status" + `/${product._id}`,
      product
    );
  }
  
  deleteProductByColor(product,i){
    console.log(product)
    console.log(i)
    return this.http.post("http://localhost:3000/deleteProductByColor" + `/${product._id}`, i)
  }

  deleteMany(selectedID){
    console.log(selectedID)
    return this.http.post("http://localhost:3000/deleteMultipleProduct", selectedID)
  }

  deleteAll(product){
    console.log(product)
    return this.http.post("http://localhost:3000/deleteAllProduct", product)
  }

  activeAll(product){
    console.log(product)
    return this.http.post("http://localhost:3000/activeAllProduct", product)
  }

  deactiveAll(product){
    console.log(product)
    return this.http.post("http://localhost:3000/deactiveAllProduct", product)
  }

  activeMany(selectedID){
    console.log(selectedID)
    return this.http.post("http://localhost:3000/activeMultipleProduct", selectedID)
  }

  deactiveMany(selectedID){
    console.log(selectedID)
    return this.http.post("http://localhost:3000/deactiveMultipleProduct", selectedID)
  }

  // editProductByColorImage(product: Product) {
  //   return this.http.put(
  //     "http://localhost:3000/editProduct/colorimage" + `/${product._id}`,
  //     product
  //   );
  // }

  editProductByColorImage(body?: any) {
    console.log(body)
    const formdata = new FormData();
    for (const i in body) {
      if (typeof body[i] === "object" && body[i] && body[i][0]) {
        for (const k in body[i]) {
          if (body[i].hasOwnProperty(k)) {
            const e = body[i][k];
            formdata.append(i + "[]", e);
          }
        }
      } else {
        formdata.append(i, body[i]);
      }
    }
    return this.http2
      .put("http://localhost:3000/editProduct/colorimage" + `/${body._id}`, formdata)
  }


  editProductByCategory(product: Product) {
    return this.http.put(
      "http://localhost:3000/editProduct/category" + `/${product._id}`,
      product
    );
  }

  deleteProduct(_id: string) {
    return this.http.delete("http://localhost:3000/deleteProduct" + `/${_id}`);
  }
}
