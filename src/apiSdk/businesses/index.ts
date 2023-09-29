import queryString from 'query-string';
import { BusinessInterface, BusinessGetQueryInterface } from 'interfaces/business';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBusinesses = async (
  query?: BusinessGetQueryInterface,
): Promise<PaginatedInterface<BusinessInterface>> => {
  return fetcher('/api/businesses', {}, query);
};

export const createBusiness = async (business: BusinessInterface) => {
  return fetcher('/api/businesses', { method: 'POST', body: JSON.stringify(business) });
};

export const updateBusinessById = async (id: string, business: BusinessInterface) => {
  return fetcher(`/api/businesses/${id}`, { method: 'PUT', body: JSON.stringify(business) });
};

export const getBusinessById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/businesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBusinessById = async (id: string) => {
  return fetcher(`/api/businesses/${id}`, { method: 'DELETE' });
};
