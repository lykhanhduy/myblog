import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }
  onSubmit(formLogIn) {
    this.user.checkLogin(formLogIn.value)
    .subscribe(login => {
      if (login === 'success') {
        this.user.setUserLoggedIn();
        this.router.navigate(['admin/home']);
      } else {
        this.router.navigate(['admin']);
      }
    });
  }

}
