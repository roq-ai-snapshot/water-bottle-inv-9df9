import { InventoryInterface } from 'interfaces/inventory';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface SupplyChainInterface {
  id?: string;
  product_id: string;
  supplier_name: string;
  quantity_ordered: number;
  order_date: any;
  expected_delivery_date?: any;
  business_id: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  business?: BusinessInterface;
  _count?: {};
}

export interface SupplyChainGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  supplier_name?: string;
  business_id?: string;
}
