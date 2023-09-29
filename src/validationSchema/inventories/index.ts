import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  last_restock_date: yup.date().nullable(),
  next_restock_date: yup.date().nullable(),
  business_id: yup.string().nullable().required(),
});
