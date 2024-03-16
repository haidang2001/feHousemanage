import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDeletePopupComponent } from './house-delete-popup.component';

describe('HouseDeletePopupComponent', () => {
  let component: HouseDeletePopupComponent;
  let fixture: ComponentFixture<HouseDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDeletePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
