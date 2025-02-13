import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatableTextComponent } from './translatable-text.component';

describe('TranslatableTextComponent', () => {
  let component: TranslatableTextComponent;
  let fixture: ComponentFixture<TranslatableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslatableTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
