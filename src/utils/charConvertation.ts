
export const convChar = (str: string): string => {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&deg;/g, "°");
    return str;
}