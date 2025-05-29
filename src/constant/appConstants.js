export const ROLE_ADMIN = "ADMIN";
export const ROUTE_ADMIN = "admin";

export const ROLE_USER = "USER";

export const ADMIN_SERVICE_KEY = "ADMIN";
export const DEFAULT_SERVICE_KEY = "USER";

export const RESPONSE_OK = 200;
export const RESPONSE_CREATED = 201;

export const API_METHOD_GET = "GET";
export const API_METHOD_POST = "POST";
export const API_METHOD_DELETE = "DELETE";
export const API_METHOD_PUT = "PUT";

// this MAP for make diffrent service separated url
export const BASE_URLS = new Map();
BASE_URLS.set(DEFAULT_SERVICE_KEY, `${import.meta.env.VITE_API_URL}`);
BASE_URLS.set(ADMIN_SERVICE_KEY, `${import.meta.env.VITE_API_URL}`);

export const ImageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
export const SiteUrl = `${import.meta.env.VITE_SITE_URL}`;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
