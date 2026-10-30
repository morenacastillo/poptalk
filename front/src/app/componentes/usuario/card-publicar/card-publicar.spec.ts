import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPublicar } from './card-publicar';

describe('CardPublicar', () => {
  let component: CardPublicar;
  let fixture: ComponentFixture<CardPublicar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPublicar],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPublicar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
