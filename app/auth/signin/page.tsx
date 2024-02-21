import { AuthWrapper } from "@/core/ui/layout";
import { SignInFragment } from "@/feature/auth/Fragments";

const Login = () => {
  return (
    <AuthWrapper>
      <SignInFragment />
    </AuthWrapper>
  );
};
export default Login;
