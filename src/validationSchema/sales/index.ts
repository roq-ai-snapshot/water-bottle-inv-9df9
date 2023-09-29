import * as yup from 'yup';

export const salesValidationSchema = yup.object().shape({
  quantity_sold: yup.number().integer().required(),
  sales_date: yup.date().required(),
  product_id: yup.string().nullable().required(),
  business_id: yup.string().nullable().required(),
});
