/** Public-site brand assets under `/public`. */

/** Primary site logo (PNG). */
export const CHILMUND_LOGO_SRC = '/Chilmund%20Chemicals(Small-PNG)-01.png'

/** Full-colour logo — SEO / structured data. */
export const CHILMUND_LOGO_COLOUR_SRC = '/Chilmund%20Chemicals(Small-PNG)-01.png'

export const CHILMUND_LOGO_ALT = 'Chilmund Chemicals'

/** Full raster dimensions of `Chilmund Chemicals(Small-PNG)-01.png`. */
export const CHILMUND_LOGO_FULL = { width: 1136, height: 737 } as const

/**
 * Tight bounds of visible logo artwork inside the PNG (excludes empty margins).
 * Derived from non-transparent / non-background pixels in the source file.
 */
export const CHILMUND_LOGO_CONTENT = { x: 193, y: 228, width: 748, height: 281 } as const

/**
 * Top of "CHILMUND" wordmark within cropped logo, as fraction of crop height.
 * Icon extends above the wordmark — use for About hero text alignment.
 */
export const CHILMUND_LOGO_WORDMARK_TOP_RATIO = 58 / CHILMUND_LOGO_CONTENT.height

/** Padding-top (% of equal-width column) to align body copy with the wordmark. */
export const CHILMUND_LOGO_WORDMARK_TOP_PADDING = `${(58 / CHILMUND_LOGO_CONTENT.width) * 100}%`
