import { Injectable } from '@nestjs/common';

@Injectable()
export class SabreDriverService {
  async doRequest(method, authorization, payload, scopeAction): Promise<any> {
    const status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    };
    const json = (response) => response.json();
    const options = {
      method: method,
      timeout: 30,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: 'Bearer ' + authorization,
      },
      body: JSON.stringify(payload),
    };
    return fetch(`https://api.cert.platform.sabre.com/${scopeAction}`, options)
      .then(status)
      .then(json)
      .then((response) => {
        console.log('response',response)
        return response;
      })
      .catch((error) => {
        console.log('error',error)
        return error;
      });
  }

  async sabreDoRequest(apiUrl, options): Promise<any> {
    const status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    };
    const json = (response) => response.json();
    return fetch(apiUrl, options)
      .then(status)
      .then(json)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
