import { CheckCircle2, XCircle } from "lucide-react";

interface I_ValidationCheckProps {
  check?: boolean;
}
const ValidationCheck = ({ check }: I_ValidationCheckProps) => {
  return check ? (
    <CheckCircle2 className="h-6 w-6 text-emerald-normal" />
  ) : (
    <XCircle className="h-6 w-6 text-red-error" />
  );
};
export default ValidationCheck;
