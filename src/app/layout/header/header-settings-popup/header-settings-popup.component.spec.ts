import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingsPopupComponent } from './header-settings-popup.component';

describe('HeaderSettingsPopupComponent', () => {
  let component: HeaderSettingsPopupComponent;
  let fixture: ComponentFixture<HeaderSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSettingsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
