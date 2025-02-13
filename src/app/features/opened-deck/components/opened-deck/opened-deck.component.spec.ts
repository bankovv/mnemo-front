import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedDeckComponent } from './opened-deck.component';

describe('OpenedDeckComponent', () => {
  let component: OpenedDeckComponent;
  let fixture: ComponentFixture<OpenedDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenedDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenedDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
