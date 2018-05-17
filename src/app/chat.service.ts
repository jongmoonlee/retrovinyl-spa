// import { User } from 'firebase/app';
import { AppUser } from './models/app-user';
import { ChatFormComponent } from './chat-form/chat-form.component';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

import { ChatMessage } from './models/chat-message';
import { UserService } from './user.service';
import { User } from './models/user';

@Injectable()
export class ChatService {

  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userId$;
  userName$;
  user$: Observable<firebase.User>;
  appUser = {
    'name': null,
    'email': null
  };
  private authState: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private user: UserService,
    ) {
      this.auth.appUser$.take(1).subscribe(u => {
        this.appUser.name = u.name;
        this.appUser.email = u.email;
      });
    }




  sendMessage(msg: string) {
    this.auth.appUser$.subscribe(appUser => this.appUser = this.appUser);
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessage();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.appUser.name,
      email: this.appUser.email
    });

    console.log('Called sendMessage()!');
  }

  getMessage(): FirebaseListObservable<ChatMessage[]> {
    return this.db.list('messages', {
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                (now.getUTCMonth() + 1) + '/' +
                now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                now.getUTCMinutes() + ':' +
                now.getUTCSeconds();

    return (date + ' ' + time);
  }


}
