import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../shared/user.service';
import { BlogAddService } from '../../shared/blog-add.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
  providers: [UserService, BlogAddService]
})
export class BlogAddComponent implements OnInit {

  constructor(private service: BlogAddService ,private userService: UserService,
     private router: Router )  { }

  ngOnInit() {

  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
 /* resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.service.selectedBlog = {
      title: '',
      shortDescription: '',
      category: '',
      fullDescription: '',
    }
  }*/

