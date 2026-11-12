import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditarPerfil } from './modal-editar-perfil';

describe('ModalEditarPerfil', () => {
  let component: ModalEditarPerfil;
  let fixture: ComponentFixture<ModalEditarPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEditarPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
