import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  userList$: Observable<string[]>;
  constructor(private activeUsers: AuthService) {
    this.userList$ = this.activeUsers.getActiveUserList();
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
