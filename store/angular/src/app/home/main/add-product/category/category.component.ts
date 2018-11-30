import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product.model";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, Validators, FormControl, NgForm } from "@angular/forms";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  products: any;
  m: any;
  brandName: any;
  routeSubscription: Subscription;
  statusM: any;
  statusW: any;

  constructor(
    private product_service: ProductService,
    private router: Router,
    private activeRoutes: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activeRoutes.queryParams.subscribe(
      (param: Params) => {
        if (param._id) {
          console.log(param._id);
          this.getProductById(param._id);
        }
      }
    );
  }

  selectedProduct: Product = {
    _id: "",
    name: "",
    brandName: "",
    supplierName: "",
    itemNo: "",
    weight: "",
    weightq:"",
    quantity:"",
    regular: "",
    groupOrder: "",
    quickQuote: "",
    uniform: "",
    printted: "",
    embroidery: "",
    description: "",

    price: "",
    sizes: "",
    sizem: "",
    sizel: "",
    sizexl: "",
    information1: "",
    information2: "",

    ColorID: "",
    additionalPrice: "",
    colorName: "",
    colorCode: "",
    frontImage: "",
    frontThumb:"",
    backImage: "",
    backThumb:"",
    rightImage: "",
    rightThumb:"",
    leftImage: "",
    leftThumb:"",

    men:"",
    women:"",
    m_ts_shortSleeve: "",
    m_ts_longSleeve: "",
    m_ts_performance: "",
    m_sh_shortSleeve: "",
    m_sh_longSleeve: "",
    m_sh_performance: "",
    m_po_shortSleeve: "",
    m_po_longSleeve: "",
    w_ts_shortSleeve: "",
    w_ts_longSleeve: "",
    w_ts_performance: "",
    w_sh_shortSleeve: "",
    w_sh_longSleeve: "",
    w_po_shortSleeve: "",
    w_po_longSleeve: "",

    status:"",
  };

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.selectedProduct = {
      _id: "",
      name: "",
      brandName: "",
      supplierName: "",
      itemNo: "",
      weight: "",
      weightq:"",
      quantity:"",
      regular: "",
      groupOrder: "",
      quickQuote: "",
      uniform: "",
      printted: "",
      embroidery: "",
      description: "",

      price: "",
      sizes: "",
      sizem: "",
      sizel: "",
      sizexl: "",
      information1: "",
      information2: "",

      ColorID: "",
      additionalPrice: "",
      colorName: "",
      colorCode: "",
      frontImage: "",
      frontThumb:"",
      backImage: "",
      backThumb:"",
      rightImage: "",
      rightThumb:"",
      leftImage: "",
      leftThumb:"",

      men:"",
      women:"",
      m_ts_shortSleeve: "",
      m_ts_longSleeve: "",
      m_ts_performance: "",
      m_sh_shortSleeve: "",
      m_sh_longSleeve: "",
      m_sh_performance: "",
      m_po_shortSleeve: "",
      m_po_longSleeve: "",
      w_ts_shortSleeve: "",
      w_ts_longSleeve: "",
      w_ts_performance: "",
      w_sh_shortSleeve: "",
      w_sh_longSleeve: "",
      w_po_shortSleeve: "",
      w_po_longSleeve: "",

      status:"",
    };
  }

onSelectMen(event: any){
  console.log(event);
  this.statusW = !this.statusW;
}

onSelectWomen(event: any){
  console.log(event);
  this.statusM = !this.statusM;
}

  onUpdate(form: NgForm) {
    console.log(form.value);
    this.product_service.editProductByCategory(form.value).subscribe(
      (res:any) => {
        var _id = res.response._id;
        this.showSuccess();
        this.getProductById(_id)
        // this.router.navigate(["/main/viewProducts"],{queryParams: {_id}})
        // this.resetForm(form);
      },
      err => {
        this.showFailure(err);
      }
    );
  }

  getProductById(_id: string) {
    this.product_service.getProductById(_id).subscribe((res: any) => {
      this.products = res.response;
      this.selectedProduct = res.response;
      console.log(res.response);
      console.log(res.response.men);
      console.log(res.response.women);
      if (res.response.women == "true"){
        console.log("Else If working");
          this.statusM = true;
          this.statusW = false;
        }
      else if (res.response.men == "true"){
        console.log("Else If working");
          this.statusM = false;
          this.statusW = true;
        }
        else {
          console.log("Else working");
          this.statusM = false;
          this.statusW = false;
        }
    });
  }

  onClear() {
    this.resetForm();
  }

  showSuccess() {
    this.toastr.success("Product Updated Successfully!");
  }

  showFailure(err) {
    this.toastr.error("Please try again!");
  }
}
