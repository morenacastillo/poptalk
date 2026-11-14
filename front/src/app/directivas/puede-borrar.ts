import { Directive, OnInit, TemplateRef, ViewContainerRef, input } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Directive({
  selector: '[appPuedeBorrar]',
})
export class PuedeBorrar implements OnInit {
  appPuedeBorrar = input(''); // id del autor de la publicación o del comentario

  constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef, private auth: AuthService) {}

  ngOnInit() {
    const usuario = this.auth.usuario();
    const esAutor = usuario?._id === this.appPuedeBorrar();
    const esAdmin = usuario?.perfil === 'administrador';

    if (esAutor || esAdmin) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}