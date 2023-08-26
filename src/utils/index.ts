export const Parameterize = (url: string, placeholder: string, value: string): string => {
    return url.replace(placeholder, value);
  }