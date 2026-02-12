import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);

    console.log("Token extrait depuis l'en-tête:", token);

    if (!token) {
      token = this.extractTokenFromCookie(request);
      console.log("Token extrait depuis le cookie:", token);
    }

    if (!token) {
      console.log('Aucun token trouvé');
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'tetedenoeil',
      });
      console.log('Token validé avec succès, payload:', payload);
      request['user'] = payload;
    } catch (error) {
      console.error('Erreur de validation du token:', error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['jwt'];
  }
}
