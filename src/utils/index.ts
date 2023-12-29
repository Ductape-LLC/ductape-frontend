export const Parameterize = (url: string, placeholder: string, value: string): string => {
  return url.replace(placeholder, value);
}

export const Capitalize = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}