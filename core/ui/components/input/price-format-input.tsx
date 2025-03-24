import { NumberFormatBase, NumberFormatBaseProps } from "react-number-format";

export default function CustomNumberFormat(props: NumberFormatBaseProps) {
  const format = (numStr: string) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number(numStr));
  };

  return (
    <NumberFormatBase
      format={format}
      {...props}
    />
  );
}
