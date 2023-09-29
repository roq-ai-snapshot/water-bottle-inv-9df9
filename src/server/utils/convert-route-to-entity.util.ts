const mapping: Record<string, string> = {
  businesses: 'business',
  customers: 'customer',
  inventories: 'inventory',
  sales: 'sales',
  'supply-chains': 'supply_chain',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
