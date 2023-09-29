import queryString from 'query-string';
import { SalesInterface, SalesGetQueryInterface } from 'interfaces/sales';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSales = async (query?: SalesGetQueryInterface): Promise<PaginatedInterface<SalesInterface>> => {
  return fetcher('/api/sales', {}, query);
};

export const createSales = async (sales: SalesInterface) => {
  return fetcher('/api/sales', { method: 'POST', body: JSON.stringify(sales) });
};

export const updateSalesById = async (id: string, sales: SalesInterface) => {
  return fetcher(`/api/sales/${id}`, { method: 'PUT', body: JSON.stringify(sales) });
};

export const getSalesById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/sales/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSalesById = async (id: string) => {
  return fetcher(`/api/sales/${id}`, { method: 'DELETE' });
};
