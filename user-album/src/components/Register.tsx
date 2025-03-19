import { useState } from "react";
import { RegisterUserDto } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext";

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');

    const apiClient = useApiClient()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Create an instance of RegisterUserDto
        const userDto = new RegisterUserDto({
            name,
            email,
            password,
            roleName
        });

        try {
            const response = await apiClient.register(userDto)
            console.log('response', response);
        }
        catch (error: any) {
            console.log(error.message);
        }

    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Role Name:</label>
                <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
            <button type="submit">Register</button>
        </form>
    </>)
}

export default Register