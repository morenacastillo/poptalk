import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsuarioDocumentAuth = HydratedDocument<Usuario>

@Schema()
export class Usuario {
    @Prop()
    nombre: string;

    @Prop()
    email: string;
    
    @Prop()
    password: string;

}

export const UsuarioAuth = SchemaFactory.createForClass(Usuario)
