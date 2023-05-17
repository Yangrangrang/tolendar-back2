import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";

// Injectable() 데코레이터를 사용하여 NestJS에 의해 인스턴스화될 수 있도록 표시
@Injectable()
// CanActivate 인터페이스를 구현하면 nestjs에서 제공하는 Guard를 사용할 수 있음.

export class AuthGuard implements CanActivate {

  constructor(
    private jwtService : JwtService, 
    private reflector : Reflector
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("test");
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic){
      // 조건
    console.log("2222");
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTockenFromHeader(request);

    if (!token){
      console.log("33333");
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      console.log("4444");
      request['user'] = payload;
    } catch {
      // 요청 거부
      throw new UnauthorizedException();
    }
    return true;
  }

  // 토큰 유효한지 확인
  private extractTockenFromHeader(request :Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
