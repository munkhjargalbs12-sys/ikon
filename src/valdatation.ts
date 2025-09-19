// valdatation.tsx

export function isValidPhone(phone: string): boolean {
  return /^\d{8}$/.test(phone); // зөвхөн 8 цифр
}

export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

export function isEmpty(value: string): boolean {
  return value.trim() === "";
}

export function isAddressComplete(address: { [key: string]: string }): boolean {
  return Object.values(address).every((val) => !isEmpty(val));
}
