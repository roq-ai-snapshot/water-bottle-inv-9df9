import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSales } from 'apiSdk/sales';
import { salesValidationSchema } from 'validationSchema/sales';
import { InventoryInterface } from 'interfaces/inventory';
import { BusinessInterface } from 'interfaces/business';
import { getInventories } from 'apiSdk/inventories';
import { getBusinesses } from 'apiSdk/businesses';
import { SalesInterface } from 'interfaces/sales';

function SalesCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SalesInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSales(values);
      resetForm();
      router.push('/sales');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SalesInterface>({
    initialValues: {
      quantity_sold: 0,
      sales_date: new Date(new Date().toDateString()),
      product_id: (router.query.product_id as string) ?? null,
      business_id: (router.query.business_id as string) ?? null,
    },
    validationSchema: salesValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Sales',
              link: '/sales',
            },
            {
              label: 'Create Sales',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Sales
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Quantity Sold"
            formControlProps={{
              id: 'quantity_sold',
              isInvalid: !!formik.errors?.quantity_sold,
            }}
            name="quantity_sold"
            error={formik.errors?.quantity_sold}
            value={formik.values?.quantity_sold}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity_sold', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="sales_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Sales Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.sales_date ? new Date(formik.values?.sales_date) : null}
              onChange={(value: Date) => formik.setFieldValue('sales_date', value)}
            />
          </FormControl>
          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            labelField={'product_name'}
          />
          <AsyncSelect<BusinessInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Business'}
            placeholder={'Select Business'}
            fetcher={getBusinesses}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/sales')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sales',
    operation: AccessOperationEnum.CREATE,
  }),
)(SalesCreatePage);
