import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductService } from "../../../shared/services/product.service";
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from "@angular/router";
import * as _ from "lodash";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Product } from "../../../shared/models/product.model";
import { ToastrService } from "ngx-toastr";
declare var m: any;
declare var $: any;

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
  providers: [ProductService]
})
export class ViewProductComponent implements OnInit {
  searchKey: string;
  products: any;
  p: number = 1;
  m: any;
  brandName: any;
  pageOfItems: Array<any>;
  config: any;
  limit: number;
  currentPage: number;
  totalCount: number;
  data: boolean;
  active: boolean;
  selectedID = [];
  selectedAll: any;
  selectAll: any;
  isSelectALL : boolean;
  isAvailable: boolean ;
  ALL:boolean;
  name: any;
  totalProduct: any;
  currentProductNumber: any;
  A: boolean;

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
    information1:"",
    information2:"",

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

  constructor(
    private product_service: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) 
  {
    this.config = {
      currentPage: 1,
      itemsPerPage: 9,
    };

    this.route.queryParams.subscribe((param: Params) => {
        this.config.currentPage = param.page;
    });
  }
  
  pageChange(page: number) {
    this.router.navigate(["/main/viewProducts"], { queryParams: {page} });
  }

  onSort(event) {
    console.log(event.target.value);
    this.product_service.getProductSort(event.target.value).subscribe((res: any) => {
      this.products = res.response as Product[];
      console.log(this.products);
    });
}

performMany(event){
  console.log(event.target.value)
  console.log(this.selectedID);
  if(event.target.value == "Delete"){
    console.log("Delete Working");
  if(confirm("Are you sure to delete :")) {
  this.product_service.deleteMany(this.selectedID).subscribe((res:any) =>{
    console.log(res);
    this.getProduct();
    this.showSuccess();
    this.selectedID = [];
    this.name = "";
  })
}
  }

  else if(event.target.value == "Active"){
    console.log(event.target.value)
    console.log(this.selectedID);
    console.log("Active Working");
    if(confirm("Are you sure to Active Selected :")) {
    this.product_service.activeMany(this.selectedID).subscribe((res:any) =>{
      console.log(res);
      this.getProduct();
      this.showActive();
      this.selectedID = [];
      this.name = "";
    })
  }
    }

    else if (event.target.value == "Deactive"){
      console.log(event.target.value)
      console.log(this.selectedID);
      console.log("Deactive Working");
      if(confirm("Are you sure to Deactive Selected :")) {
      this.product_service.deactiveMany(this.selectedID).subscribe((res:any) =>{
        console.log(res);
        this.getProduct();
        this.showDeactive();
        this.selectedID = [];
        console.log(this.selectedID);
        
      })
    }
      }
      else{
        return;
      }
}

  ngOnInit() {
    this.getProduct();
    //this.getProductByItemNo({brandName:''})
  }

  getProduct() {
    this.product_service.getProduct().subscribe((res: any) => {
      this.products = res.response as Product[];
      console.log(this.products);
      this.totalProduct = res.response.length;
      console.log(this.totalProduct)
      // console.log(this.products.productImage);
    });
  }

  getProductByItemNo(form: NgForm) {
    console.log(form.value.itemNo);
    this.product_service
      .getProductByItemNo(form.value.itemNo)
      .subscribe((res: any) => {
        console.log(res);
        console.log(res.response);
        if (res.response.status == "Active"){
          this.A = true;
        }
        else { this.A == false;}
        if (res.response.length == 0){
          console.log(res.response.length);
          console.log("Not data found");
          this.data = true;
        }
        else
        this.data = false;
        this.products = res.response;
      });
  }

  refresh(): void {
    this.data = false;
    this.getProduct();
  }

  getProductByName(form: NgForm) {
    console.log(form.value.productName);
    this.product_service
      .getProductByItemNo(form.value.productName)
      .subscribe((res: any) => {
        console.log(res.response);
        this.products = res.response;
      });
  }

  clickMethod(_id: string,name: string) {
    console.log();
    if(confirm("Are you sure to delete :"+name)) {
      this.product_service.deleteProduct(_id).subscribe(res => {
        this.getProduct();
        this.showSuccess();
      });
    }
  }

selectALL(event){
  this.ALL = !this.ALL;
  console.log(this.config.currentPage);
  if(this.config.currentPage == "1"){
    this.currentProductNumber = 9
  }
  else
  this.currentProductNumber = this.totalProduct - ((this.config.currentPage-1)*9)
  console.log(this.currentProductNumber);
  console.log(this.products)
  for (var i = 0; i < 9; i++) {
    this.products[i].selected = this.selectedAll;
    this.selectedID.push(this.products[i]._id)
    console.log(this.selectedID)
  }

  if(event.target.value == "Delete1"){
    console.log("Delete Working");
  if(confirm("Are you sure to delete :")) {
  this.product_service.deleteAll(this.products).subscribe((res:any) =>{
    console.log(res);
    this.getProduct();
    this.showSuccess();
  })
}
  }

  else if(event.target.value == "Active1"){
    console.log(event.target.value)
    console.log(this.selectedID);
    console.log("Active Working");
    if(confirm("Are you sure to Active Selected :")) {
    this.product_service.activeAll(this.products).subscribe((res:any) =>{
      console.log(res);
      this.getProduct();
      this.showActive();
    })
  }
    }

    else if (event.target.value == "Deactive1"){
      console.log(event.target.value)
      console.log(this.selectedID);
      console.log("Deactive Working");
      if(confirm("Are you sure to Deactive Selected :")) {
      this.product_service.deactiveAll(this.products).subscribe((res:any) =>{
        console.log(res);
        this.getProduct();
        this.showDeactive();
      })
    }
      }
      else{
        return;
      }
}

  selectall() {
    this.selectAll = true;  
    this.selectedID.push(this.products._id)
    console.log(this.selectedID)
  }

  editProduct(product: Product) {
    console.log(product._id);
    this.router.navigate(["/main/addProducts/productInfo"], {
      queryParams: { _id: product._id }
    });
  }

  deleteProduct(_id: string) {
    console.log(_id);
    this.product_service.deleteProduct(_id).subscribe((res:any) => {
      this.getProduct();
      this.showSuccess();
    });
  }
  
  status(product: Product){
    console.log(product);
    this.product_service.editProductByStatus(product).subscribe((res:any) => {
      console.log(res.response.status);
      this.getProduct()
    })
  }
  

getID(id){  
  this.selectedID.push(id)
  console.log(this.selectedID);
}


  showSuccess() {
    this.toastr.success("Product Deleted Successfully!");
  }

  showActive() {
    this.toastr.success("Product Actived Successfully!");
  }

  showDeactive() {
    this.toastr.success("Product Deactived Successfully!");
  }

  showFailure(err) {
    this.toastr.error("Please try again!");
  }

  // getProductById(form: NgForm) {
  //   console.log(form.value._id);
  //   this.product_service.getProductById(form.value._id).subscribe((res: any) => {
  //     console.log(res);
  //     console.log(res.response);
  //     this.p = res.response as Product[];
  //     var newArrayDataOfOjbect = Object.values(this.p);
  //     this.products = newArrayDataOfOjbect
  //     console.log(this.products);
  //   });
  // }

}
