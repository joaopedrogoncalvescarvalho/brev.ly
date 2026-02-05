export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);

    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return false;
    }

    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return false;
    }

    if (!urlObj.hostname.includes(".")) {
      return false;
    }

    const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?$/;
    if (!hostnameRegex.test(urlObj.hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  url = url.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  if (!isValidUrl(url)) {
    return url;
  }

  return url;
};

export const isValidShortCode = (shortCode: string): boolean => {
  const shortCodeRegex = /^[a-zA-Z0-9_-]{3,10}$/;
  return shortCodeRegex.test(shortCode);
};

export const generateRandomShortCode = (): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
