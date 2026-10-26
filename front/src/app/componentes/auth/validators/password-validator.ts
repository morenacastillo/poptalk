import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(form: AbstractControl): ValidationErrors | null {
    const contrasena = form.get('contrasena')?.value;
    const confirmar = form.get('confirmarContrasena')?.value;

    if (contrasena !== confirmar) {
        return { passwordNoCoincide: true };
    }
    return null;
}