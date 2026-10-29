import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPublicacion } from './card-publicacion';

describe('CardPublicacion', () => {
  let component: CardPublicacion;
  let fixture: ComponentFixture<CardPublicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPublicacion],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPublicacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
