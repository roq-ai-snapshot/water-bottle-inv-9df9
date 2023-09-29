interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Supply Chain Analyst', 'Sales Representative', 'End Customer'],
  tenantName: 'Business',
  applicationName: 'water bottle inventory management application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage business information',
    'Manage inventory',
    'Manage sales records',
    'Manage supply chain',
    'Manage customer information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/bfd692cf-f874-4a67-9f7f-770d5151d014',
};
