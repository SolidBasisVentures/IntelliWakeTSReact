// ----------------------------
//   Cookie Manager
// ----------------------------

export function CookieCreate(name: string, value: string | null, days: number) {
    name = name.replace(/=/g, "");
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

export function CookieRead(name: string, defaultValue: string | null = null): string | null {
    name = name.replace(/=/g, "");
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return defaultValue;
}

export function CookieErase(name: string) {
    CookieCreate(name, "", -1);
}
