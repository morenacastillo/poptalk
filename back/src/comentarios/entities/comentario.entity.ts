import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type ComentarioDocument = HydratedDocument<Comentario>

@Schema({ collection: 'comentarios' })
export class Comentario {
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
    autor: Types.ObjectId;
    
    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Publicacion', required: true })
    publicacion: string;

    @Prop({required: true})
    mensaje: string;

    @Prop({required: true, default: Date.now})
    fechaCreacion: Date;

    @Prop({default: false})
    modificado: boolean;

    @Prop({ default: true })
    habilitado: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);