export const convertToKebabCase = (value: string) => value.replace(/ /g, '-').replace(/\./g, '').toLowerCase()
