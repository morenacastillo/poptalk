import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PublicacionDocument = HydratedDocument<Publicacion>

@Schema()
export class Publicacion {
    
    @Prop({required: true})
    titulo: string;

    @Prop({required: true})
    mensaje: string;

    @Prop()
    imagen: string;

    @Prop({required: true})
    autor: string;

    @Prop({default: Date.now})
    fechaPublicacion: Date;

    @Prop({ type: [String], default: [] })
    likes: string[];

    @Prop({default: true})
    habilitado: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);