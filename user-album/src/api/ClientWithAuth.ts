import { ApiClient } from "./client";

export class ApiClientWithAuth extends ApiClient {
    private token: string | null = null;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(baseUrl, http);
    }

    // Method to set the token globally
    setAuthToken(token: string | null): void {
        this.token = token;
    }

    // Override the method to fetch with Authorization header
    private addAuthorizationHeader(headers: Headers) {
        if (this.token) {
            headers.set('Authorization', 'Bearer ' + this.token);
        }
    }

    private async fetchWithAuth(url: string, options: RequestInit): Promise<Response> {
        // Ensure headers are a Headers instance
        if (options.headers && !(options.headers instanceof Headers)) {
            options.headers = new Headers(options.headers); // Convert to Headers instance if not already
        }
    
        // Add Authorization header
        this.addAuthorizationHeader(options.headers);
    
        // Use the http.fetch method (assuming it's available in ApiClient)
        return this.http.fetch(url, options); // Or `this.fetch` if that's the correct method
    }

    // Override the fetch method of ApiClient to use fetchWithAuth
    fetch(url: string, options: RequestInit): Promise<Response> {
        return this.fetchWithAuth(url, options);
    }
}