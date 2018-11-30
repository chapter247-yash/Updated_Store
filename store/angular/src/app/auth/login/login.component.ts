import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../../shared/services/admin-login.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    _id: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl("")
  });

  serverErrorMessages: string;

  constructor(private admin_service: AdminService, private router: Router,private toastr: ToastrService,) {}

  ngOnInit() {
    if (this.admin_service.isLoggedIn()) this.router.navigateByUrl("/home");
  }

  onSubmit(form) {
    form.username = "admin123"
    console.log(form.value);
    this.admin_service.login(form).subscribe(
      res => {
        console.log(res);
        this.admin_service.setToken(res["token"]);
        this.router.navigateByUrl("/main");
      },
      err => {
        this.serverErrorMessages = err.error.message;
        this.showFailure(err)
      }
    );
  }

  onClear() {
    this.form.reset();
    this.admin_service.initializeFormGroup();
  }

  showFailure(err) {
    this.toastr.error(err.error.message);
  }

}
