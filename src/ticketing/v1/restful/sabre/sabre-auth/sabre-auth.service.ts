import { Injectable } from '@nestjs/common';
import { SabreDriverService } from '../sabre-driver/sabre-driver.service';

@Injectable()
export class SabreAuthService extends SabreDriverService {
  async sabreAuthToken(): Promise<any> {
    const usernameAndIppc = Buffer.from("V1:wen5ka3z5z43gvwn:DEVCENTER:EXT", 'utf8').toString(
      'base64',
    );
    const authorization = Buffer.from(
      usernameAndIppc +
        ':' +
        Buffer.from('TE8omA9r', 'utf8').toString('base64'),
      'utf8',
    ).toString('base64');
    const options = {
      method: 'post',
      timeout: 30,
      headers: {
        authorization: 'basic ' + authorization,
        'accept-encoding': 'gzip',
        'user-agent':
          'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.3) Gecko/20070309 Firefox/2.0.0.3',
        accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };
    try {
      const response = await this.sabreDoRequest(
        'https://api.cert.platform.sabre.com/v2/auth/token',
        options,
      );
      return response.access_token;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
