import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type PublicacionDocument = HydratedDocument<Publicacion>

@Schema()
export class Publicacion {
    
    @Prop({required: true})
    titulo: string;

    @Prop({required: true})
    mensaje: string;

    @Prop()
    imagen: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
        autor: Types.ObjectId;

    @Prop({default: Date.now})
    fechaPublicacion: Date;

    @Prop({ type: [String], default: [] })
    likes: string[];

    @Prop({default: true})
    habilitado: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);