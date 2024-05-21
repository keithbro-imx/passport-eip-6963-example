import { ImmutableConfiguration, Environment } from "@imtbl/sdk/config";
import { Passport } from "@imtbl/sdk/passport";

const baseConfig: ImmutableConfiguration = {
  environment: Environment.PRODUCTION,
};

const clientId = process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID;
if (!clientId) throw new Error("Client ID is not defined");

const redirectUri = process.env.NEXT_PUBLIC_PASSPORT_REDIRECT_URI;
if (!redirectUri) throw new Error("Redirect URI is not defined");

const logoutRedirectUri = process.env.NEXT_PUBLIC_PASSPORT_LOGOUT_REDIRECT_URI;
if (!logoutRedirectUri) throw new Error("Logout redirect URI is not defined");

export const passportInstance = new Passport({
  baseConfig,
  clientId,
  redirectUri,
  logoutRedirectUri,
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

passportInstance.connectEvm();
