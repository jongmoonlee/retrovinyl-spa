import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  albums: any;
  constructor(private album: AlbumService) { }

  ngOnInit() {
    this.album.getAll().subscribe(res => {
      this.albums = res.json();
  });
  }
}
