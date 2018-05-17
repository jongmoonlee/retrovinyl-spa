import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  async login() {
    await this.auth.login();
  }

  async loginFacebook() {
    await this.auth.loginFacebook();
  }

  async loginTwitter() {
    await this.auth.loginTwitter();
  }

  async loginGithub() {
    await this.auth.loginGithub();
  }

}
