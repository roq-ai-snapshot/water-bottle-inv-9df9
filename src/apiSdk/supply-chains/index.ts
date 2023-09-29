import queryString from 'query-string';
import { SupplyChainInterface, SupplyChainGetQueryInterface } from 'interfaces/supply-chain';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSupplyChains = async (
  query?: SupplyChainGetQueryInterface,
): Promise<PaginatedInterface<SupplyChainInterface>> => {
  return fetcher('/api/supply-chains', {}, query);
};

export const createSupplyChain = async (supplyChain: SupplyChainInterface) => {
  return fetcher('/api/supply-chains', { method: 'POST', body: JSON.stringify(supplyChain) });
};

export const updateSupplyChainById = async (id: string, supplyChain: SupplyChainInterface) => {
  return fetcher(`/api/supply-chains/${id}`, { method: 'PUT', body: JSON.stringify(supplyChain) });
};

export const getSupplyChainById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/supply-chains/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSupplyChainById = async (id: string) => {
  return fetcher(`/api/supply-chains/${id}`, { method: 'DELETE' });
};
