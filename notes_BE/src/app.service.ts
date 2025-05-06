import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAdminHello(): string {
    return 'hello admin!';
  }

  getUserHello(): string {
    return 'hello client!';
  }
}
