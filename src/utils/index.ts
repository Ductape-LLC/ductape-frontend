export const Parameterize = (
  url: string,
  placeholder: string,
  value: string
): string => {
  return url.replace(placeholder, value);
};

export const Capitalize = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const appUrl =
  process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "production"
    ? "https://app.com"
    : "";
