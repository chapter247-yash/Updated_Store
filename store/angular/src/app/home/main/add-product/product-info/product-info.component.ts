import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, NgForm } from "@angular/forms";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "ngx-toastr";
import { Product } from "../../../../shared/models/product.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare const CKEDITOR: any;
declare const unlayer: any;

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"]
})
export class ProductInfoComponent implements OnInit {

  public Editor = ClassicEditor;
  $: any;
  M: any;
  description: any;
  routeSubscription: Subscription;
  products: Product[];
  response: any;
  displayImage: boolean;
  showFiles: boolean;
  is_image: number;
  url: string;
  id: string;
  quantity: string;
  public editorValue: string = '';
  config = {};

  constructor(
    private product_service: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoutes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activeRoutes.queryParams.subscribe(
      (param: Params) => {
        if (param._id) {
          this.id = param._id;
          this.getProductById(param._id);
        }
      }
    );
  }

  ngAfterViewInit() {
    // var config = {};
    //config.placeholder = 'some value';
    CKEDITOR.replace( 'editor1', {
      language: 'fr',
      uiColor: '#9AB8F3',
      height:'500px',
      cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
      cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
  });

  if(this.selectedProduct){

  }

    // CKEDITOR.replace( 'editor1'
//     , {
//       on: {
//           instanceReady: function() {
//               this.document.appendStyleSheet( "../../../../../assets/css" );
//           }
//       }
// } 
 //         );
  
  // unlayer.init({
  //   id: 'editor-container',
  //   projectId: 1234,
  //   templateId: 1,
  //   user: {
  //     id: 1, // User ID - Required
  //   }
  // })
  // var design = {}; // template JSON
  // unlayer.loadDesign(design);
    }
  
  selectedProduct: Product = {
    _id: "",
    name: "",
    brandName: "",
    itemNo: "",
    supplierName: "",
    weight: "",
    weightq:"gms",
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

  selectQuantity(event){
    this.selectedProduct.weightq = event.target.value
    console.log(this.selectedProduct.weightq)}

  // uploadFile = (event: any) => {
  //   console.log("On change Working!");
  //   console.log(event.target.files[0]);
  //   this.productImage = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (eventNew: any) => {
  //       this.url = eventNew.target.result;
  //       this.displayImage = true;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };

  getProductById(_id: string) {
    this.product_service.getProductById(_id).subscribe((res: any) => {
      this.products = res.response;
      // console.log(res.response.weight);
      this.selectedProduct = res.response;
      CKEDITOR.instances['editor1'].setData(res.response.description);
    });
  }

  // onChangeDescription(event){
  //   unlayer.exportHtml(function(data) {
  //     var json = data.design; // design json
  //     this.description = JSON.stringify(data.design);
  //     var html = data.html; // final html
  //     console.log(typeof this.description);
  //     console.log(this.description);
  //     // console.log(typeof jsonStringify);
  //     // console.log(jsonStringify);
  //     // console.log(typeof html);
  //     // console.log(html);
  //   })
  // }

  onSubmit(form: NgForm) {
    this.selectedProduct.description = CKEDITOR.instances.editor1.getData();
    form.value.weightq = this.selectedProduct.weightq
    form.value.description = this.selectedProduct.description
    //form.value.description = this.description
    form.value._id=this.id
    console.log(form.value);
    console.log(typeof form.value);
    if (this.id) {
      console.log("Edit Working");
      this.product_service.editProductByInfo(form.value).subscribe(
        (res: any) => {
          var _id = res.response._id;
          console.log(res);
          this.showUpdate();
          // this.router.navigate(["/main/addProducts/size"], {
          //   queryParams: { _id }
          //   });
        },
        err => {
          this.selectedProduct.weightq = "gms";
          this.showFailure(err);
        }
      );
    } else {
      //form.value.description = CKEDITOR.instances.editor1.getData(); 
      console.log(form.value);
      console.log("Submit Working");
      this.product_service.postProduct(form.value).subscribe(
        (res: any) => {
          var _id = res.response._id;
          console.log(res);
          console.log(res.response);
          this.showSuccess();
          this.router.navigate(["/main/addProducts/size"], {
          queryParams: { _id }
          });
         // this.resetForm(form);
        },
        err => {
          this.selectedProduct.weightq = "gms";
          this.showFailure(err);
        }
      );
    }
  }

  showSuccess() {
    this.toastr.success("Product Added Successfully!");
  }

  showUpdate() {
    this.toastr.success("Product Updated Successfully!");
  }

  showFailure(err) {
    this.toastr.error("Please try again!");
  }
}
