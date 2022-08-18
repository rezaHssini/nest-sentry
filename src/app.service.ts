import { Injectable } from '@nestjs/common';
import { CatchErrorWithSentry } from './mixins/decorators/catch-error-with-sentry';

@Injectable()
export class AppService {
  
  @CatchErrorWithSentry()
  getHello(): void {
    throw new Error('test error');
  }
}
