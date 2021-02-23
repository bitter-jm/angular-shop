import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SignInForm } from './signin-form.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fetching = false;

  errorMessage = "";
  passwordVal = "";
  verifyVal = "";

  constructor(private userService: UserService, private router: Router) {  }

  ngOnInit(): void {
    //console.log(this.form);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return;
    const email = form.value.email;
    const password = form.value.password;
    const verify = form.value.verify;
    if (password.length < 6) {
      this.errorMessage = "Password must be at least 6 characters long.";
      return;
    }
    if (password !== verify) {
      this.errorMessage = "Passwords don't match.";
      return;
    }

    this.errorMessage = "";
    this.fetching = true;
    var signedIn = this.userService.signin(email, password).subscribe((created) => {
      console.log("User signed in.");
      this.fetching = false;
      this.router.navigate(["/"])

    }, (error) => {
      console.log("error:")
      console.log(error);
      try {
        if (error.error.error.message === "EMAIL_EXISTS") {
          this.errorMessage = "This email is already in use."
        } else {
          this.errorMessage = "Error signing you in. Error code: " + error.error.error.message;
        }
      } catch (error) {
        this.errorMessage = "An unexpected error occurred while signing you in. Please try again.";
      }
      this.fetching = false;
    });

  }

}
