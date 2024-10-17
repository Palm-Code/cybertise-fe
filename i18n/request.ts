import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";
import axios, { AxiosResponse } from "axios";
import { getUserDataAPIURL } from "@/core/routes/common";
import { getSession } from "@/service/server/session";
import { I_GetUserDataSuccessResponse } from "@/core/models/common";
import { headers } from "next/headers";

const LANGUAGE_LIST = ["en", "de"];

const getUserData = async () => {
  const session = await getSession();
  if (!session) {
    //detect browser language
    const browserLanguage = headers().get("accept-language")?.split(",")[0];
    const language = LANGUAGE_LIST.some((lang) => lang === browserLanguage)
      ? browserLanguage
      : "en";
    return {
      language,
    };
  }
  const userData = await axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + getUserDataAPIURL(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    .then(
      (res: AxiosResponse<I_GetUserDataSuccessResponse["data"]>) => res.data
    )
    .catch((err) => {
      return {
        language: "en",
      };
    });

  return userData;
};

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const user = await getUserData();

  const locale = user.language;

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
