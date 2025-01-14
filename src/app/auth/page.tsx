import { BannerForm, LoginForm, RegisterForm } from "@/components";

export default function AuthPage() {
  return (
    <div className="bg-white rounded-3xl shadow-md relative overflow-hidden w-4/5 max-w-full py-10 flex justify-center">
      <div className="top-0 h-full transition-all ease-in-out left-0 w-1/2">
        <RegisterForm />
      </div>

      <div className="top-0 h-full transition-all ease-in-out right-0 w-1/2">
        <LoginForm />
      </div>

      <BannerForm />
    </div>
  );
}