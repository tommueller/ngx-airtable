import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { AirtableConfiguration } from '../interfaces/airtable-configuration';
import { NGX_AIRTABLE_CONFIG } from '../token/ngx-airtable-configuration';
import { Observable, of } from 'rxjs';
import { Executioner } from '../interfaces/executioner';
import { TableOptions } from '../interfaces/table-options';
import { base } from '../operators/base';
import { table } from '../operators/table';

const defaultOptions: Partial<AirtableConfiguration> = {
  endpointUrl: 'https://api.airtable.com',
  apiVersion: 0
};

@Injectable({
  providedIn: 'root'
})
export class Airtable {

  constructor(
    private readonly http: HttpClient,
    @Inject(NGX_AIRTABLE_CONFIG) private readonly config: AirtableConfiguration
  ) {
    this.config = { ...defaultOptions, ...this.config };
    this.checkConfiguration();
  }

  public build(baseId?: string, tableOptions?: TableOptions): Observable<Executioner> {

    const headers = {
      ...{
        authorization: `Bearer ${this.config.apiKey}`
      }
    };

    let airtableObs = of<Executioner>({
      http: this.http,
      url: `${this.config.endpointUrl}/v${this.config.apiVersion}`,
      headers: new HttpHeaders(headers)
    });

    if (!!baseId) {
      airtableObs = airtableObs.pipe(base(baseId));
    }

    if (tableOptions) {
      airtableObs = airtableObs.pipe(table(tableOptions));
    }

    return airtableObs;
  }

  // execute(action: RunAction): Observable<any> {

  //   const headers = {
  //     ...{
  //       authorization: `Bearer ${this.config.apiKey}`
  //     }, ...action.headers
  //   };

  //   const request: HttpRequest<any> = new HttpRequest<any>(action.method,
  //     `${this.config.endpointUrl}/v${this.config.apiVersion}/${action.base.baseId}/${action.path}`,
  //     action.body,
  //     {
  //       headers: new HttpHeaders(headers),
  //       params: action.params
  //     });

  //   const requestResult = this.http.request(request)
  //     .pipe(
  //       map(event => this._mapApiResponse(event)),
  //       last() // return last (completed) message to caller,
  //     );

  //   (action.pipes || []).forEach((pipe: OperatorFunction<any, any>) => requestResult.pipe(pipe));

  //   return requestResult;
  //   // return this.http.request(request)
  //   //   .pipe(
  //   //     map(event => this._mapApiResponse(event)),
  //   //     last() // return last (completed) message to caller,
  //   //   );
  // }

  private checkConfiguration(): void {
    if (!this.config.apiKey) {
      throw new Error('API key is required to connect to Airtable');
    }
  }
}
