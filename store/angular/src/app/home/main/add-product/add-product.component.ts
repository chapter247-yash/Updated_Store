import { Component,ViewChild, OnInit,AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ProductService } from "../../../shared/services/product.service";
import { ProductInfoComponent } from "../add-product/product-info/product-info.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit,AfterViewInit {
  
  @ViewChild(ProductInfoComponent) child;
  
  M: any;
  status: string;
 buttonDisabled : Boolean = false;
 routeSubscription: Subscription;
 id: string;
  constructor(private product_service: ProductService, private router: Router, private activeRoutes: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.activeRoutes.queryParams.subscribe(
      (param: Params) => {
        if (!param._id) {
          this.id = "";
          this.buttonDisabled = false;
        }
        else  {
          this.id = param._id;
          this.buttonDisabled = true;
        }
      }
    );
  }

  ngAfterViewInit() {}

  form: FormGroup = new FormGroup({
    _id: new FormControl(""),
    model: new FormControl(""),
    image: new FormControl(""),
    description: new FormControl(""),
    date: new FormControl(""),
    price: new FormControl(""),
    size: new FormControl(""),
    speed: new FormControl(""),
    engine: new FormControl(""),
    maxperson: new FormControl("")
  });

  onSubmit(form) {
    console.log(form);
    if (form._id == "")
      this.product_service.postProduct(form).subscribe(res => {
        console.log(res);
      });
  }

}
