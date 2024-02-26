export const currencyFormatters = {
  IDRToNumber(value: string) {
    const result = parseInt(value.replace("Rp ", "").replaceAll(/\D/g, ""));
    return result;
  },
  NumberToIDR(value: number) {
    const result = value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
    return result;
  },
  NumberToDollar(value: number) {
    const result = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return result;
  },
  NumberToIDRAbbreviation(value: number) {
    const billion = 1000000000;
    const million = 1000000;
    const k = 1000;
    const divider =
      value >= billion
        ? value / billion
        : value >= million
          ? value / million
          : value >= k
            ? value / k
            : value;
    const roundNumber = Math.round(divider * 100) / 100;
    const result = roundNumber.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 2,
    });

    const resultWithLabel =
      value >= billion
        ? `${result} B`
        : value >= million
          ? `${result} M`
          : value >= k
            ? `${result} K`
            : result;
    const englishCommaNumberFormatter = resultWithLabel.replace(",", ".");
    return englishCommaNumberFormatter;
  },
  NumberToIDRAbbreviationWithoutRP(value: number) {
    const billion = 1000000000;
    const million = 1000000;
    const k = 1000;
    const divider =
      value >= billion
        ? value / billion
        : value >= million
          ? value / million
          : value >= k
            ? value / k
            : value;
    const roundNumber = Math.round(divider * 100) / 100;
    const result = roundNumber.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 2,
    });

    const resultWithLabel =
      value >= billion
        ? `${result} B`
        : value >= million
          ? `${result} M`
          : value >= k
            ? `${result} K`
            : result;
    const englishCommaNumberFormatter = resultWithLabel.replace(",", ".");
    return englishCommaNumberFormatter.replace("Rp", "");
  },
  IDRInput(value: string) {
    const result =
      value.length <= 0
        ? ""
        : value.length <= 3 && value.includes("Rp")
          ? value.replace("Rp", "")
          : parseInt(
              value.replace("Rp ", "").replaceAll(/\D/g, "")
            ).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            });

    return result;
  },
};
