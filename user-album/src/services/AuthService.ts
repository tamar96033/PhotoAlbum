const BASE_URL = 'https://localhost:7256/api';

interface LoginResponse {
    token: string;
    user: any; // Replace 'any' with the actual user type
}

export async function login(email: string, password: string): Promise<any | null> { // Replace 'any' with the actual user type
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) return null;

        const data: LoginResponse = await response.json();
        localStorage.setItem('token', data.token);
        return data.user; // Assuming the server returns user details
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}

// const BASE_URL = 'https://localhost:7256/api';

// export async function login(email, password) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) return null;

//     const data = await response.json();
//     localStorage.setItem('token', data.token);
//     return data.user; // בהנחה שהשרת מחזיר גם את פרטי המשתמש
//   } catch (error) {
//     console.error('Login error:', error);
//     return null;
//   }
// }