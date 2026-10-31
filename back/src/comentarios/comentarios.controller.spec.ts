import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosController } from './comentarios.controller.js';
import { ComentariosService } from './comentarios.service.js';

describe('ComentariosController', () => {
  let controller: ComentariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentariosController],
      providers: [ComentariosService],
    }).compile();

    controller = module.get<ComentariosController>(ComentariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
