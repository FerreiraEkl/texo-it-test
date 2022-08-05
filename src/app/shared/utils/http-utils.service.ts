import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilsService {
  constructor() {}

  /**
   * Create a URI with custom query params
   * @param params - object - filter to create a URI with filter params - Required
   * @returns string - URI with filter params - example: ?nome=teste&ativo=true
   */
  public build<T>(params: T): string {
    return (Object.keys(params) as Array<keyof T>)
      .filter((key) => params[key] !== undefined)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  }
}
