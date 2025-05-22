// // import { AuthorizedApiClient } from "../api/AuthorizeApiClient";
// import { LoginUserDto, RegisterUserDto } from "../api/client";

// class AuthService {
//   private token: string | null = null;

//   async login(name: string, password: string): Promise<void> {
//     // מבצעים את קריאת ה-API לקבלת token

//     const loginUserDto = new LoginUserDto();
//     loginUserDto.name = name;
//     loginUserDto.password = password; 
//     const response = await apiClient.login(loginUserDto);
//     if (response.token) {
//       this.token = response.token;  // שומרים את ה-token
//     }
//   }
  
//   async register({name, email, password, roleName}:{name: string,email: string, password: string, roleName:string} ): Promise<void> {
//     // מבצעים את קריאת ה-API לרישום המשתמש
//     const registerUserDto = new RegisterUserDto();  // אם יש לך דגם כזה עבור רישום
//     registerUserDto.name = name;
//     registerUserDto.password = password;
//     registerUserDto.email = email;
//     registerUserDto.roleName = roleName
//     const response = await apiClient.register(registerUserDto);
//     if (response.token) {
//       this.token = response.token;  // שומרים את ה-token אם הרישום הצליח
//     }
//   }

//   // מחזירים את ה-token אם יש
//   getAuthorization(): string {
//     return this.token || '';  // אם אין token, מחזירים מיתר ריק
//   }
// }

// // יצירת אובייקט של AuthService
// export const authService = new AuthService();

// // יצירת אובייקט של AuthorizedApiClient עם פונקציה שמחזירה את ה-token
// const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
// // const apiClient = new AuthorizedApiClient(API_BASE_URL, () => authService.getAuthorization());