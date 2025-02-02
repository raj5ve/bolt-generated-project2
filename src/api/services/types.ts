/**
 * @typedef {Object} ServicePackage
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} deliveryTime
 * @property {string[]} features
 */

/**
 * @typedef {Object} ServiceImage
 * @property {string} url
 * @property {File|null} file
 */

/**
 * @typedef {Object} ServiceGalleryItem
 * @property {string} id
 * @property {string} url
 * @property {File|null} file
 */

/**
 * @typedef {Object} ServiceDocument
 * @property {string} id
 * @property {string} name
 * @property {number} size
 * @property {string} url
 */

/**
 * @typedef {Object} ServiceRequirement
 * @property {string} id
 * @property {string} question
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {'Available'|'Limited'|'Unavailable'} availability
 * @property {'fixed'|'hourly'|'packages'} pricingType
 * @property {number|null} fixedPrice
 * @property {number|null} hourlyRate
 * @property {ServicePackage[]} packages
 * @property {string} requirementsDescription
 * @property {ServiceRequirement[]} requirements
 * @property {ServiceImage|null} featuredImage
 * @property {ServiceGalleryItem[]} gallery
 * @property {ServiceDocument[]} documents
 */

export {};
