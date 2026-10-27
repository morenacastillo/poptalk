import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { parse } from 'path';

@Injectable()
export class FileService {
    constructor() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    subirImagen(archivo: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
        const subida = cloudinary.uploader.upload_stream(
            {
            folder: 'tp2',
            public_id: parse(archivo.originalname).name,
            resource_type: 'image',
            },
            (error, resultado) => {
            if (error) {
                return reject(new InternalServerErrorException('No se pudo subir la imagen'));
            }
            if (!resultado?.secure_url) {
                return reject(new InternalServerErrorException('No se recibió la URL de la imagen'));
            }
            resolve(resultado.secure_url);
            },
        );
        subida.end(archivo.buffer);
        });
    }
}
