import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  authState: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute) {}


  login(model: any) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'login', model, options).map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    });
  }


  logout() {
  }

  // }

  get appUser$(){
    return null;
  }


  get currentUserId() {
    // return this.userId !== null ? this.userId : '';
    return null;
  }

  setUserStatus(state: string): void {
    // console.log('usrId', this.userId);
    // const path = 'users/' + this.userId;
    // const data = {
    //   status: state
    // };

    // // tslint:disable-next-line:whitespace
    // if (this.userId) {this.db.object(path).update(data).catch(error => console.log(error));}
    // // tslint:disable-next-line:one-line
    // else {

    // }
  }

  getActiveUserList() {
    // return this.db.list('users/', {
    //   query: {
    //     orderByChild: 'status',
    //     equalTo: 'online'
    //   }
    // });
  }

  isAdmin() {
    // return this.db.object('users/' + this.currentUserId);
}
}
