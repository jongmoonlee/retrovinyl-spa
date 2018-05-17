import { ChatMessage } from './../models/chat-message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timestamp: Date = new Date();

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent =  chatMessage.message;
    this.userName = chatMessage.userName;
    this.timestamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
  }

}
