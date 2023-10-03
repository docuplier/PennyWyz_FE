import { APP_KEY } from "./appStorage";

const getDocument = typeof window !== "undefined" ? document : undefined;

export const setCookie = (
  cname: string,
  cvalue: string,
  expirationTime: Date,
  useDate = false
) => {
  var date = new Date();
  date.setTime(date.getTime() + 1 * 60 * 1000);
  let expires = "expires=" + expirationTime?.toUTCString() + `;path="/"`;

  if (getDocument) {
    document.cookie =
      APP_KEY + "-" + cname + "=" + cvalue + ";" + expires + ";path=/";
  }
};

export const getCookie = (cname: string) => {
  let name = APP_KEY + "-" + cname + "=";
  if (!getDocument) return;
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
export const deleteCookie = (cname: string) => {
  let name = APP_KEY + "-" + cname + "=";

  if (!getDocument) return;
  return (document.cookie =
    name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;");
};
