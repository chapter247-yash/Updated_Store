import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogAddService {

  readonly baseURL = 'http://localhost:3000/blog';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    fullDescription: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      title: '',
      shortDescription: '',
      category: '',
      fullDescription: '',
    });
  }
}
