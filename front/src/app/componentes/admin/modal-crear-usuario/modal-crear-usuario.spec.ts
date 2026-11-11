import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearUsuario } from './modal-crear-usuario';

describe('ModalCrearUsuario', () => {
  let component: ModalCrearUsuario;
  let fixture: ComponentFixture<ModalCrearUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCrearUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCrearUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
