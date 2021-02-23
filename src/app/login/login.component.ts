import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fetching = false;
  errorMessage = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this.errorMessage = "";
    this.fetching = true;
    var signedIn = this.userService.login(form.value.email, form.value.password).subscribe((created) => {
      console.log("User logged in.");
      this.fetching = false;
      this.router.navigate(["/"])

    }, (error) => {
      console.log("error:")
      console.log(error);
      try {
        if (error.error.error.message === "INVALID_PASSWORD") {
          this.errorMessage = "Wrong password..."
        } else if (error.error.error.message === "EMAIL_NOT_FOUND") {
          this.errorMessage = "This email is not registered yet. Try signing in first."
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
