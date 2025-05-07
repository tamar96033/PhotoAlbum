import { Injectable } from '@angular/core';
import { ApiClient } from './api-client';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private readonly apiClient: ApiClient;

  constructor() {
    const baseUrl = 'https://localhost:7256';
    // this.apiClient = new ApiClient(baseUrl);
  
  const fetchWrapper = {
    fetch: window.fetch.bind(window)
  };
  this.apiClient = new ApiClient(baseUrl, fetchWrapper);
}
  get client(): ApiClient {
    return this.apiClient;
  }
}
