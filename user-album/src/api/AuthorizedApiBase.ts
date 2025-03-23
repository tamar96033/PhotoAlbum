// export interface IConfig {
//     getAuthorization: () => string;  // פונקציה שתהיה אחראית להחזיר את ה-Bearer Token
// }

// export class AuthorizedApiBase {
//     protected config: IConfig;

//     constructor(config: IConfig) {
//         this.config = config;
//     }

//     // הפונקציה הזו מתווספת לכל קריאה כדי להוסיף את ה-Authorization לכל קריאה
//     protected transformOptions(options: RequestInit): Promise<RequestInit> {
//         options.headers = {
//             ...options.headers,
//             Authorization: this.config.getAuthorization() ? `Bearer ${this.config.getAuthorization()}` : ''
//         };
//         return Promise.resolve(options);
//     }
// }
