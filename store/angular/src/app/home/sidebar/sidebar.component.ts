import { Component, OnInit, Output, EventEmitter } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  
  @Output() p_v: EventEmitter<any> = new EventEmitter<any>();

  product_view: any;
  product_add:any;

  constructor() {
    $(document).ready(function() {
      $("a").click(function() {
        $("a.active").removeClass("active");
        $(this).addClass("active");
      });
    });
  }

  ngOnInit() {} 

  onProductView(event) {
    this.product_view = true;
    this.product_add = false;
  }

  onAddProduct(event) {
    this.product_add = true;
    this.product_view = false
  }

}
