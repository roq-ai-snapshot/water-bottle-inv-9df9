import { SalesInterface } from 'interfaces/sales';
import { SupplyChainInterface } from 'interfaces/supply-chain';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_name: string;
  quantity: number;
  business_id: string;
  last_restock_date?: any;
  next_restock_date?: any;
  created_at?: any;
  updated_at?: any;
  sales?: SalesInterface[];
  supply_chain?: SupplyChainInterface[];
  business?: BusinessInterface;
  _count?: {
    sales?: number;
    supply_chain?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
  business_id?: string;
}
