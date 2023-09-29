import { InventoryInterface } from 'interfaces/inventory';
import { SalesInterface } from 'interfaces/sales';
import { SupplyChainInterface } from 'interfaces/supply-chain';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory?: InventoryInterface[];
  sales?: SalesInterface[];
  supply_chain?: SupplyChainInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    sales?: number;
    supply_chain?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
