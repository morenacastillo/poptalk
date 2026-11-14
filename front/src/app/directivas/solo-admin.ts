import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Directive({
  selector: '[appSoloAdmin]',
})
export class SoloAdmin {
  constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef, private auth: AuthService) {
    if (this.auth.usuario()?.perfil === 'administrador') {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}