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
  NumberToUSD(value: number) {
    const result = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return result;
  },
  NumberToEUR(value: number) {
    const result = value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return result;
  },
  NumberToSmallEUR(value: number): string {
    // Format the number as currency
    const formattedValue = value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });

    // Split the formatted value into the numeric part and the currency symbol
    const [numericPart, currencySymbol] = formattedValue.split(/\s+/);

    // Return the HTML string with the currency symbol in a smaller font size
    return `<span>${numericPart}</span><span style="font-size: 0.6em; opacity: 0.5; font-weight: 500">${currencySymbol}</span>`;
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
