import { ChatMessage } from './../models/chat-message';
import { FirebaseListObservable } from 'angularfire2/database';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessage();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessage();
  }
  onScroll() {
    console.log('scrolled!!');
  }
}
