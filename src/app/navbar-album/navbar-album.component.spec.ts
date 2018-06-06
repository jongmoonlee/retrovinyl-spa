import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAlbumComponent } from './navbar-album.component';

describe('NavbarAlbumComponent', () => {
  let component: NavbarAlbumComponent;
  let fixture: ComponentFixture<NavbarAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
