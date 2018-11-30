import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product.model";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, Validators, FormControl, NgForm } from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare const CKEDITOR: any;
declare const CKEDITOR2: any;
declare const unlayer: any;

@Component({
  selector: "app-size-price",
  templateUrl: "./size-price.component.html",
  styleUrls: ["./size-price.component.css"]
})

export class SizePriceComponent implements OnInit {
  public Editor = ClassicEditor;
  products: any;
  m: any;
  brandName: any;
  routeSubscription: Subscription;
  response:any;
  information1Image:any

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
          this.getProductById(param._id);
        }
      }
    );    

    CKEDITOR.replace( 'information1', {
      language: 'fr',
      uiColor: '#9AB8F3',
      height:'500px',
      cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
      cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
  });

  CKEDITOR.replace( 'information2', {
    language: 'fr',
    uiColor: '#9AB8F3',
    height:'500px',
    cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
    cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
});

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


  // onChangeInformation1(event){
  //   unlayer.exportHtml((data) => {
  //     var json = data.design; // design json
  //     this.information1 = JSON.stringify(data.design);
  //     var html = data.html; // final html 
  //     console.log(this.information1);
      
  //     // console.log(typeof jsonStringify);
  //     // console.log(jsonStringify);
  //     // console.log(typeof html);
  //     // console.log(html);
  //   })
  // }

  // onReady1(eventData) {
  //   eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
  //     console.log(loader.file);
  //     this.information1Image = loader.file;    
  //     console.log(this.information1Image);
  //     return new UploadAdapter1(loader);
  //   };
  //   console.log(this.information1Image);
  // }

  // onReady2(eventData) {
  //   eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
  //     console.log(btoa(loader.file));
  //     return new UploadAdapter1(loader);
  //   };
  // }

  getProductById(_id: string) {
    this.product_service.getProductById(_id).subscribe((res: any) => {
      this.selectedProduct = res.response;
      CKEDITOR.instances['information1'].setData(res.response.information1);
      CKEDITOR.instances['information2'].setData(res.response.information2);
      console.log(this.selectedProduct);
      // console.log(this.selectedProduct.information1);
      // this.products = res.response;
      // console.log(this.products);
    });
  }

  onUpdate(form: NgForm) { 
    form.value.information1 = CKEDITOR.instances.information1.getData();
    form.value.information2 = CKEDITOR.instances.information2.getData();
      // console.log(this.information1Image);
      // form.value.information1Image = this.information1Image;
      console.log(form.value);
      this.product_service.editProduct(form.value).subscribe(
        (res:any) => {
          var _id = res.response._id;
          this.showSuccess();
          //this.router.navigate(["/main/addProducts/color"], {queryParams: { _id }});
          //this.resetForm(form);
        },
        err => {
          console.log(err);
          //this.showFailure(err);
        }
      );
  }

  showSuccess() {
    this.toastr.success("Product Updated Successfully!");
  }

  showFailure(err) {
    this.toastr.error("Please try again!");
  }
}

// class UploadAdapter1 {
//   private loader;
//   constructor(loader: any) {
//     this.loader = loader;
//   }

//   public upload(): Promise<any> {
//     return this.readThis(this.loader.file);
//   }

//   readThis(file: File): Promise<any> {
//     let imagePromise: Promise<any> = new Promise((resolve, reject) => {
//       var myReader: FileReader = new FileReader();
//       myReader.onloadend = (e) => {
//         let image = myReader.result;
//         console.log(image);
//         console.log(typeof image);
        
        
//         return { default: "data:image/png;base64," + image };
//         resolve();
//       }
//       myReader.readAsDataURL(file);
//     });
//     return imagePromise;
//   }
//}