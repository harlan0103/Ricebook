import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * 
   */
  it('should log out a user (login state should be cleared)', () => {
    component.logOutUser();
    let currentUser = localStorage.getItem("currentUser");
    expect(currentUser).toBe("");
  });
});
