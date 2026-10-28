import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate { //los guards son clases siempre can activate

  constructor(private readonly jwtService: JwtService) {}

  // sirve para verificar que el token sea valido antes de entrar al sitio
  canActivate(
    context: ExecutionContext,): 
    boolean | Promise<boolean> | Observable<boolean> {
    
    const token = this.extractTokenCookie(context); //extrae e tijeb dek oedudi

    if(!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token); //verifica si es valido y no esta vencido
      console.log(payload)
      context.switchToHttp().getRequest().user = payload;
      return true
    } catch (e) {
      throw new UnauthorizedException();
    }
  }


  extractTokenCookie(context: ExecutionContext): string | null { 
    console.log('TOKEN DESDE COOKIES')
    const token = context.switchToHttp().getRequest().cookies?.['token'];
    return token || null;
  }
}
