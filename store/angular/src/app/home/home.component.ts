import { Component, OnInit, ViewChild, Input, AfterViewChecked } from '@angular/core';
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewChecked {
@ViewChild(SidebarComponent) child;
  routeSubscription: Subscription;
  product_view:false;
  product_add:true;
  urlfinal:any;
  ufinal:any;
  ufinal1:any;
  ufinal2:any;

  constructor(
    private activeRoutes: ActivatedRoute,
    private router: Router
  ) 
  {
    router.events.subscribe((val) => {
      var url = this.router.routerState.snapshot.url.split ('?')
      this.urlfinal = "/" + url[0]
      this.ufinal = url[0].split('/')
      if(this.ufinal[2]== undefined){
        this.ufinal1 = ""
      }
      else
      this.ufinal1 = "/" + this.ufinal[2]
      if(this.ufinal[3]== undefined){
        this.ufinal2 = ""
      }
      else
      this.ufinal2 = "/" + this.ufinal[3]
      //console.log(this.ufinal[2].split(/(?=[A-Z])/).join("-"));
  });
   }

  ngOnInit() {
    this.routeSubscription = this.activeRoutes.queryParams.subscribe(
      (param: Params) => {          
        // if (param._id) {
          // this.id = param._id;
          // this.getProductById(param._id);
        // }
      }
    );
  }

  ngAfterViewChecked() {
    this.product_view = this.child.product_view
    this.product_add = this.child.product_add

  }

}
