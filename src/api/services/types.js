/**
 * @typedef {Object} ServicePackage
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} deliveryTime
 * @property {string[]} features
 */

/**
 * @typedef {Object} ServiceReview
 * @property {string} id
 * @property {string} userName
 * @property {string|null} userAvatar
 * @property {number} rating
 * @property {string} comment
 * @property {string} date
 */

/**
 * @typedef {Object} ServiceRequirement
 * @property {string} id
 * @property {string} question
 */

/**
 * @typedef {Object} ServiceDocument
 * @property {string} id
 * @property {string} name
 * @property {number} size
 * @property {string} url
 */

/**
 * @typedef {Object} ServiceProvider
 * @property {string} name
 * @property {string} title
 * @property {string} username
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} availability
 * @property {Object} featuredImage
 * @property {Array} gallery
 * @property {ServiceDocument[]} documents
 * @property {ServicePackage[]} packages
 * @property {string[]} includes
 * @property {string} deliveryTime
 * @property {string} requirementsDescription
 * @property {ServiceRequirement[]} requirements
 * @property {ServiceReview[]} reviews
 * @property {ServiceProvider} provider
 */

export {};
