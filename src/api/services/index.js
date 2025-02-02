import { mockServices } from './mockData/services';
import { formatServiceSlug, validateServiceData } from './utils';

/**
 * Get all services
 * @returns {Promise<Array>}
 */
export const getServices = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockServices;
};

/**
 * Get a single service by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getService = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const service = mockServices.find(s => s.id === id);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

/**
 * Get a service by slug
 * @param {string} slug 
 * @returns {Promise<Object>}
 */
export const getServiceBySlug = async (slug) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const service = mockServices.find(s => formatServiceSlug(s.title) === slug);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

/**
 * Update a service
 * @param {string} id 
 * @param {Object} serviceData 
 * @returns {Promise<Object>}
 */
export const updateService = async (id, serviceData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!validateServiceData(serviceData)) {
    throw new Error('Invalid service data');
  }

  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Service not found');
  }
  
  mockServices[index] = {
    ...mockServices[index],
    ...serviceData,
    id // Ensure ID doesn't change
  };
  
  return mockServices[index];
};

/**
 * Delete a service
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const deleteService = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Service not found');
  }
  
  mockServices.splice(index, 1);
  return { success: true };
};

/**
 * Create a new service
 * @param {Object} serviceData 
 * @returns {Promise<Object>}
 */
export const createService = async (serviceData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!validateServiceData(serviceData)) {
    throw new Error('Invalid service data');
  }

  const newService = {
    id: String(mockServices.length + 1),
    ...serviceData,
    availability: 'Available'
  };
  
  mockServices.push(newService);
  return newService;
};

export * from './utils';
