import { InventoryInterface } from 'interfaces/inventory';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface SalesInterface {
  id?: string;
  product_id: string;
  quantity_sold: number;
  sales_date: any;
  business_id: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  business?: BusinessInterface;
  _count?: {};
}

export interface SalesGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  business_id?: string;
}
