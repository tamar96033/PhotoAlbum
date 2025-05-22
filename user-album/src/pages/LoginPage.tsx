import { LoginForm } from "../components/auth/loginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
    // const [login, setLogin] = useState(false);
    // const [register, setRegister] = useState(false);
  
    // const handleLogin = () => {
    //   setLogin(!login);
    //   setRegister(false);
    // };
  
    // const handleRegister = () => {
    //   setRegister(!register);
    //   setLogin(false);
    // };
  
      return (<>
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link to="/register" className="hover:text-brand underline underline-offset-4">
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
        </>
      )
  };

export default LoginPage