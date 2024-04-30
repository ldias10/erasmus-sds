export function isNull(object: any): boolean {
    return object == null;
}

export function isStringEmpty(str: string): boolean {
    return isNull(str) || str.length == 0;
}