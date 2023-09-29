import queryString from 'query-string';
import { CustomerInterface, CustomerGetQueryInterface } from 'interfaces/customer';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCustomers = async (
  query?: CustomerGetQueryInterface,
): Promise<PaginatedInterface<CustomerInterface>> => {
  return fetcher('/api/customers', {}, query);
};

export const createCustomer = async (customer: CustomerInterface) => {
  return fetcher('/api/customers', { method: 'POST', body: JSON.stringify(customer) });
};

export const updateCustomerById = async (id: string, customer: CustomerInterface) => {
  return fetcher(`/api/customers/${id}`, { method: 'PUT', body: JSON.stringify(customer) });
};

export const getCustomerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/customers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCustomerById = async (id: string) => {
  return fetcher(`/api/customers/${id}`, { method: 'DELETE' });
};
