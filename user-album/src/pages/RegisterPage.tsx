import { RegisterForm } from "../components/auth/registerForm";

const RegisterPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Fill the form below to register</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="hover:text-brand underline underline-offset-4">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;