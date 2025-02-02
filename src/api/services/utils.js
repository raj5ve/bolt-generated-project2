/**
 * Formats a service slug from a title
 * @param {string} title 
 * @returns {string}
 */
export const formatServiceSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Formats price for display
 * @param {number} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

/**
 * Gets the starting price for a service
 * @param {Object} service 
 * @returns {string}
 */
export const getServiceStartingPrice = (service) => {
  if (service.pricingType === 'packages' && service.packages?.length > 0) {
    const lowestPrice = Math.min(...service.packages.map(pkg => pkg.price));
    return `From ${formatPrice(lowestPrice)}`;
  } else if (service.pricingType === 'fixed') {
    return formatPrice(service.fixedPrice);
  } else if (service.pricingType === 'hourly') {
    return `${formatPrice(service.hourlyRate)}/hour`;
  }
  return 'Custom Quote';
};

/**
 * Validates service data
 * @param {Object} serviceData 
 * @returns {boolean}
 */
export const validateServiceData = (serviceData) => {
  const requiredFields = ['title', 'description', 'category'];
  return requiredFields.every(field => !!serviceData[field]);
};
