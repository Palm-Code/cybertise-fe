import { zxcvbnOptions, zxcvbnAsync } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnDePackage from "@zxcvbn-ts/language-de";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

const options = {
  // recommended
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    // recommended the language of the country that the user will be in
    ...zxcvbnDePackage.dictionary,
  },
  // recommended
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  // recommended
  useLevenshteinDistance: true,
  // optional
  translations: zxcvbnEnPackage.translations,
};
zxcvbnOptions.setOptions(options);

export const usePasswordStrength = async (password: string) => {
  return await zxcvbnAsync(password).then((response) => response);
};
