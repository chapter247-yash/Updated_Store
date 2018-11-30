import { Component } from '@angular/core';
import { Dunebook } from './Dunebook';

import { AppService } from './app.service';
 
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 dunebookList: Dunebook[];
 
constructor(private service : AppService) {}

ngOnInit(){
}

getData(){
    this.service.getData().subscribe( (res) => {
          this.dunebookList = res as Dunebook[];
          console.log(this.dunebookList)
        }
    )

}

}