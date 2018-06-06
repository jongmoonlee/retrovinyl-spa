import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;

  userId: string;
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(
      user => this.userId = user.uid);
    }

  ngOnInit() {
    this.auth.setUserStatus('online');
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

}
