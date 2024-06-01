import { Controller, Req, Post } from '@nestjs/common';
import { SabreService } from './sabre.service';

@Controller('sabre')
export class SabreController {
  constructor(private readonly sabreService: SabreService) {}

  @Post('/api/v1/rest/airsabreshopping')
  shopping(@Req() request: Request): Promise<any> {
    return this.sabreService.bargainFinderMaxResponse(request);
  }
  // @Post('/api/v1/rest/airsabreshopping')
  // getAccessToken(@Req() request: Request): Promise<any> {
  //   return this.sabreService.bargainFinderMaxResponse(request);
  //   // return this.sabreRestfullApiService.getAccessToken();
  // }
}
