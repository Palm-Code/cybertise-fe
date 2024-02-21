import { AuthWrapper } from "@/core/ui/layout";
import { SignUpTypeFragment } from "@/feature/auth/Fragments";

export default function Register() {
  return (
    <AuthWrapper>
      <SignUpTypeFragment />
    </AuthWrapper>
  );
}
