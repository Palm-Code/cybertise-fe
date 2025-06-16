import { PasswordValidationItemsType } from "@/types/auth/sign-up";

export function validatePassword(
  value: PasswordValidationItemsType[],
  newPassword: string
) {
  const updatedValidationItems = value.map((item) => {
    if (item.type === "characters") {
      return { ...item, checked: newPassword.length >= 8 };
    }
    if (item.type === "numerical") {
      return { ...item, checked: /[0-9]/.test(newPassword) };
    }
    if (item.type === "lowercase") {
      return { ...item, checked: /[a-z]/.test(newPassword) };
    }
    if (item.type === "uppercase") {
      return { ...item, checked: /[A-Z]/.test(newPassword) };
    }
    if (item.type === "special_character") {
      return {
        ...item,
        checked: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
      };
    }
    return item;
  });

  return updatedValidationItems;
}

export async function encryptPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Generate a secure key for encryption/decryption
const generateKey = async () => {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
};

// Encrypt data
export async function encryptData(data: string) {
  const key = await generateKey();
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoder.encode(data)
  );

  // Convert the encrypted data to a format we can store
  const encryptedArray = new Uint8Array(encryptedData);
  const encryptedBase64 = btoa(
    String.fromCharCode(...Array.from(encryptedArray))
  );
  const ivBase64 = btoa(String.fromCharCode(...Array.from(iv)));

  // Export the key to store it
  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const keyBase64 = btoa(
    String.fromCharCode(...Array.from(new Uint8Array(exportedKey)))
  );

  return {
    encrypted: encryptedBase64,
    iv: ivBase64,
    key: keyBase64,
  };
}

// Decrypt data
export async function decryptData(encryptedData: {
  encrypted: string;
  iv: string;
  key: string;
}) {
  const { encrypted, iv, key } = encryptedData;

  // Convert the stored data back to the format we need
  const encryptedArray = new Uint8Array(
    atob(encrypted)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const ivArray = new Uint8Array(
    atob(iv)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const keyArray = new Uint8Array(
    atob(key)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  // Import the key
  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyArray,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  // Decrypt the data
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray,
    },
    importedKey,
    encryptedArray
  );

  // Convert the decrypted data back to a string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}
