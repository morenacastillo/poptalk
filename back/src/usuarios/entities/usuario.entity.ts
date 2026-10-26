import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsuarioDocument = HydratedDocument<Usuario>

@Schema()
export class Usuario {

    @Prop({required: true})
    nombreUsuario: string;

    @Prop({required: true})
    nombre: string;

    @Prop({required: true})
    apellido: string;

    @Prop({required: true})
    correo: string;

    @Prop({required: true})
    contrasena: string;

    @Prop({required: true})
    fechaNacimiento: Date;

    @Prop({required: true})
    descripcion: string;

    @Prop()
    imagen: string;

    @Prop({default: 'usuario'})
    perfil: string;

    @Prop({default: true})
    habilitado: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);