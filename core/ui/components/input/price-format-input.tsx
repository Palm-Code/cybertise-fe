import { NumberFormatBase, NumberFormatBaseProps } from "react-number-format";

export default function CustomNumberFormat(props: NumberFormatBaseProps) {
  const format = (numStr: string) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(numStr === "" ? 0 : Number(numStr));
  };

  return (
    <NumberFormatBase
      {...props}
      format={format}
    />
  );
}
