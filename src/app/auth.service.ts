import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  authState: any;
  user: firebase.User;
  userId: string;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private db: AngularFireDatabase)
    // tslint:disable-next-line:one-line
    {
    this.user$ = afAuth.authState;
    this.afAuth.authState.subscribe(
      user => this.userId = user.uid);
  }

  login() {
    // tslint:disable-next-line:prefer-const
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginFacebook() {
    // tslint:disable-next-line:prefer-const
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  loginTwitter() {
    // tslint:disable-next-line:prefer-const
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  }

  loginGithub() {
    // tslint:disable-next-line:prefer-const
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());
  }



  logout() {
    this.setUserStatus('offline');
    this.afAuth.auth.signOut();

  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap(user => this.userService.get(user.uid));
  }

  get currentUserId() {
    return this.userId !== null ? this.userId : '';
  }

  setUserStatus(state: string): void {
    console.log('usrId', this.userId);
    const path = 'users/' + this.userId;
    const data = {
      status: state
    };

    // tslint:disable-next-line:whitespace
    if (this.userId) {this.db.object(path).update(data).catch(error => console.log(error));}
    // tslint:disable-next-line:one-line
    else {

    }
  }


  // if (cartId) return cartId;
  // else {
  //   // tslint:disable-next-line:prefer-const
  //   let result = await this.create();
  //   localStorage.setItem('cartId', result.key);
  //   return result.key;
  // }

  getActiveUserList() {
    return this.db.list('users/', {
      query: {
        orderByChild: 'status',
        equalTo: 'online'
      }
    });
  }
}
