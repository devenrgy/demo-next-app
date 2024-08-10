export const extractIdFromSlug = (slug: string) => slug.split('-').splice(0, 1).join('')
