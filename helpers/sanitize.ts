import validator from "validator";

export const sanitizeInput = (input: string): string => {
  if (!input) {
    return "";
  }

  let sanitizedInput = validator.trim(input);

  sanitizedInput = validator.escape(sanitizedInput);
  sanitizedInput = sanitizedInput.replace(/[<>\/\\]/g, "");

  return sanitizedInput;
};
