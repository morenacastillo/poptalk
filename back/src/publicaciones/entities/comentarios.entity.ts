import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ComentarioDocument = HydratedDocument<Comentario>

@Schema()
export class Comentario {
    
    @Prop({required: true})
    publicacion: string;

    @Prop({required: true})
    usuario: string;

    @Prop({required: true})
    mensaje: string;

    @Prop({required: true, default: Date.now})
    fecha: Date;

    @Prop({default: false})
    modificado: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);