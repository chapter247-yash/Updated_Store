import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product.model";
import { Color } from "../../../../shared/models/color.model";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, Validators, FormControl, NgForm } from "@angular/forms";
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import * as _ from "lodash";
import { log } from "util";

declare var $: any;

@Component({
  selector: "app-color-image",
  templateUrl: "./color-image.component.html",
  styleUrls: ["./color-image.component.css"]
})
export class ColorImageComponent implements OnInit {
  products: any;
  m: any;
  brandName: any;
  routeSubscription: Subscription;
  response: any;
  information1: any;
  information2: any;
  colorCode = [];
  colorName= [];
  frontImage= [];
  backImage= [];
  rightImage= [];
  leftImage= [];
  urlFront: string ="";
  urlBack: string;
  urlRight: string;
  urlLeft: string;
  id: string;
  displayImageF: String;
  displayImageB: String;
  displayImageR: String;
  displayImageL: String;
  length : any;
  show: any;
  colors: any[];
  codes: any[];
  active: boolean;
  deleteC = [];

  constructor(
    private product_service: ProductService,
    private router: Router,
    private activeRoutes: ActivatedRoute,
    private toastr: ToastrService,
    private cpService: ColorPickerService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activeRoutes.queryParams.subscribe(
      (param: Params) => {
        console.log(param);
        if (param._id) {
          this.getProductById(param._id);
        }
      }
    );

    // $(document).ready(function() {
    //   $("#hideshow").on("click", function(event) {
    //     $("#content").toggle("show");
    //   });
    // });
  this.displayImageF = "false",
  this.displayImageB = "false"
  this.displayImageL = "false"
  this.displayImageR = "false"

    this.getProduct();
  }

newColor: Color = {
  newColorName: "",
  newColorCode: "",
  newColorID: "",
  additionalPrice: "",
  newFrontImage: "",
  newFrontthumb: "",
  newBackImage: "",
  newBackthumb: "",
  newRightImage: "",
  newRightThumb: "",
  newLeftImage: "",
  newLeftThumb: "",
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

    
    colorName: "",
    colorCode: "",
    ColorID: "",
    additionalPrice: "",
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

resetFormColor(form?:NgForm){
  if (form) form.reset();
  this.newColor = {
    newColorName: "",
    newColorCode: "",
    newColorID: "",
    additionalPrice: "",
    newFrontImage: "",
    newFrontthumb: "",
    newBackImage: "",
    newBackthumb: "",
    newRightImage: "",
    newRightThumb: "",
    newLeftImage: "",
    newLeftThumb: "",
  }
}

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

      colorName: "",
      colorCode: "",
      ColorID: "",
      additionalPrice: "",
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

hideandshow(){
  this.show = !this.show
}

status(){
  this.active = !this.active;
}

public onChangeColor(color: string): Cmyk {
  const hsva = this.cpService.stringToHsva(color);
  const rgba = this.cpService.hsvaToRgba(hsva);
  this.newColor.newColorCode = color;
  console.log(this.newColor.newColorCode);
  return this.cpService.rgbaToCmyk(rgba);
}

onChangeColorName(event){
  console.log(event.target.value);
  this.newColor.newColorName= event.target.value
}

onChangeAdditionalPrice(event){
  console.log(event.target.value);
  this.newColor.additionalPrice= event.target.value
}

deleteColor(i){
  this.deleteC.push(i)
  console.log(this.deleteC);
  this.product_service.deleteProductByColor(this.selectedProduct,this.deleteC).subscribe(res =>{
    console.log(res);
    this.showSuccessColor();
    console.log(this.selectedProduct._id);
    this.getProductById(this.selectedProduct._id)
  })
}

  uploadFileFront = (event: any) => {
    console.log("On change Working!");
    console.log(event.target.files[0]);
    this.frontImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventNew: any) => {
        this.urlFront = eventNew.target.result;
        this.displayImageF = "true";
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  uploadFileBack = (event: any) => {
    console.log("On change Working!");
    console.log(event.target.files[0]);
    this.backImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventNew: any) => {
        this.urlBack = eventNew.target.result;
        this.displayImageB = "true";
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  uploadFileRight= (event: any) => {
    console.log("On change Working!");
    console.log(event.target.files[0]);
    this.rightImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventNew: any) => {
        this.urlRight = eventNew.target.result;
        this.displayImageR = "true";
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  uploadFileLeft = (event: any) => {
    console.log("On change Working!");
    console.log(event.target.files[0]);
    this.leftImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventNew: any) => {
        this.urlLeft = eventNew.target.result;
        this.displayImageL = "true";
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  onUpdate(form: NgForm) {
    form.value.newColorName = this.newColor.newColorName;
    form.value.newColorCode = this.newColor.newColorCode;
    form.value.newadditionalPrice = this.newColor.additionalPrice;
    form.value.frontImage = this.frontImage;
    form.value.backImage = this.backImage;
    form.value.rightImage = this.rightImage;
    form.value.leftImage = this.leftImage;
    console.log(form.value);

    this.product_service.editProductByColorImage(form.value).subscribe(
      (res: any) => {
        console.log(res._body);
        var response = JSON.parse(res._body);
        console.log(response.response);
        this.getProductById(response.response._id);
        this.hideandshow();
        this.resetFormColor();
        this.showSuccessColorAdded();
        this.urlRight = "";
        this.urlLeft = "";
        this.urlFront = "";
        this.urlBack = "";

        // if (response.response.frontImage && response.response.backImage && response.response.leftImage && response.response.rightImage)
        //    {
        //   this.displayImageF = "true";
        //   this.displayImageB = "true";
        //   this.displayImageR = "true";
        //   this.displayImageL = "true";
        //    }
        // else if (response.response.frontImage && response.response.backImage && response.response.rightImage){
        //   this.displayImageF = "true";
        //   this.displayImageB = "true";
        //   this.displayImageR = "true";
        //   }
        // else if (response.response.frontImage && response.response.backImage){
        //   this.displayImageF = "true";
        //   this.displayImageB = "true";
        //   }
        //   else if (response.response.frontImage){
        //     this.displayImageF = "true";
        //   }
        //   else {
        //     this.displayImageF = "false";
        //     this.displayImageB = "false";
        //     this.displayImageR = "false";
        //     this.displayImageL = "false";
        //   }

        var _id = res.response._id;
        this.router.navigate(["/main/addProducts/category"], {queryParams: { _id }
        });
        this.resetForm(form);
      },
      err => {
        this.displayImageF = "false";
        this.displayImageB = "false";
        this.displayImageR = "false";
        this.displayImageL = "false";
        this.showFailure(err);
      }
    );
  }

  getProduct() {
    this.product_service.getProduct().subscribe((res: any) => {
      this.products = res.response as Product[];      
    });
  }

  getProductById(_id: string) {
    this.product_service.getProductById(_id).subscribe((res: any) => {
      this.products = res.response as Product[];
      console.log(this.products);
      this.selectedProduct = res.response;
      this.urlFront = 'http://localhost:3000/' + `${this.products.frontImage}`
    });
  }

  deleteProduct(_id: string, form: NgForm) {
    this.product_service.deleteProduct(_id).subscribe(res => {
      this.getProduct();
      this.showSuccess();
    });
  }

  editProduct(product: Product) {
    console.log(product._id);
    this.router.navigate(["/main/addProducts/productInfo"], {
      queryParams: { _id: product._id }
    });
  }

  onClear() {
    this.resetForm();
  }

  showSuccess() {
    this.toastr.success("Product Updated Successfully!");
  }

  showSuccessColor() {
    this.toastr.success("Color Removed Successfully!");
  }

  showSuccessColorAdded() {
    this.toastr.success("Color Added Successfully!");
  }

  showFailure(err) {
    this.toastr.error("Please try again!");
  }
}
