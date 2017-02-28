import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import {
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  Response,
} from '@angular/http';

import { FormErrorList } from '../form';
import { ApiConfig } from './api.config';
import { APP_CONFIG } from './app.config';
import { FormErrorListHydrator } from '../api/hydrator';

function decodeJsonResponse(response: Response, defaultValue = null): any {
  let data = defaultValue;

  try {
    data = response.json();
  } catch (e) {} // tslint:disable-line

  return data;
}

@Injectable()
export class ApiService {
  private config: ApiConfig;

  public constructor(
    @Inject(APP_CONFIG) config: any,
    private http: Http
  ) {
    this.config = new ApiConfig(config.api);
  }

  public get(endpoint: string, options?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), method: RequestMethod.Get }, options);
  }

  public post(endpoint: string, body: any, options?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), body: body, method: RequestMethod.Post }, options);
  }

  public put(endpoint: string, body: any, options ?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), body: body, method: RequestMethod.Put }, options);
  }

  public delete(endpoint: string, options ?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), method: RequestMethod.Delete }, options);
  }

  public patch(endpoint: string, body: any, options?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), body: body, method: RequestMethod.Patch }, options);
  }

  public head(endpoint: string, options?: RequestOptionsArgs) : Observable<any> {
    return this.sendRequest({ url: this.getEndpointUrl(endpoint), method: RequestMethod.Head }, options);
  }

  private static handleResponse(response: Response): any {
    return decodeJsonResponse(response);
  }

  private static handleError(response: Response): Observable<FormErrorList | any> {
    let data = decodeJsonResponse(response, {});

    if (response.status === 400 && data.errors) {
      data = FormErrorListHydrator.hydrate(new FormErrorList(), data.errors);
    }

    return Observable.throw(data);
  }

  private get baseUrl(): string {
    return this.config.baseUrl;
  }

  private get authHeaderName(): string {
    return this.config.headerName;
  }

  private getEndpointUrl(endpoint: string): string {
    const baseUrl = this.baseUrl;
    const path = _.trim(endpoint, '/');

    return `${baseUrl}/${path}`;
  }

  private sendRequest(requestArgs: RequestOptionsArgs, additionalOptions: RequestOptionsArgs): Observable<any> {
    let options = new RequestOptions(requestArgs);

    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }

    const request = new Request(options);

    return this.http.request(request)
      .map(ApiService.handleResponse)
      .catch(ApiService.handleError)
    ;
  }
}
