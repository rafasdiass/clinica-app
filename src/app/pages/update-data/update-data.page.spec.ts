import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDataPage } from './update-data.page';

describe('UpdateDataPage', () => {
  let component: UpdateDataPage;
  let fixture: ComponentFixture<UpdateDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
