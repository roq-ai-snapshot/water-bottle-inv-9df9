import * as yup from 'yup';

export const supplyChainValidationSchema = yup.object().shape({
  supplier_name: yup.string().required(),
  quantity_ordered: yup.number().integer().required(),
  order_date: yup.date().required(),
  expected_delivery_date: yup.date().nullable(),
  product_id: yup.string().nullable().required(),
  business_id: yup.string().nullable().required(),
});
