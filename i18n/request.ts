import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "de";

  const userMessages = {
    ...(await import(`../core/dictionaries/auth/${locale}.json`)).default,
    ...(await import(`../core/dictionaries/common/${locale}.json`)).default,
    ...(await import(`../core/dictionaries/admin/hacker/${locale}.json`))
      .default,
    ...(await import(`../core/dictionaries/admin/mediator/${locale}.json`))
      .default,
    ...(await import(`../core/dictionaries/admin/company/${locale}.json`))
      .default,
    ...(await import(`../core/dictionaries/admin/company/${locale}.json`))
      .default,
  };
  const defaultMessages = {
    ...(await import(`../core/dictionaries/auth/en.json`)).default,
    ...(await import(`../core/dictionaries/common/en.json`)).default,
    ...(await import(`../core/dictionaries/admin/hacker/en.json`)).default,
    ...(await import(`../core/dictionaries/admin/mediator/en.json`)).default,
    ...(await import(`../core/dictionaries/admin/company/en.json`)).default,
  };
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages: messages,
  };
});
