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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSupplyChainById, updateSupplyChainById } from 'apiSdk/supply-chains';
import { supplyChainValidationSchema } from 'validationSchema/supply-chains';
import { SupplyChainInterface } from 'interfaces/supply-chain';
import { InventoryInterface } from 'interfaces/inventory';
import { BusinessInterface } from 'interfaces/business';
import { getInventories } from 'apiSdk/inventories';
import { getBusinesses } from 'apiSdk/businesses';

function SupplyChainEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SupplyChainInterface>(
    () => (id ? `/supply-chains/${id}` : null),
    () => getSupplyChainById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SupplyChainInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSupplyChainById(id, values);
      mutate(updated);
      resetForm();
      router.push('/supply-chains');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SupplyChainInterface>({
    initialValues: data,
    validationSchema: supplyChainValidationSchema,
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
              label: 'Supply Chains',
              link: '/supply-chains',
            },
            {
              label: 'Update Supply Chain',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Supply Chain
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.supplier_name}
            label={'Supplier Name'}
            props={{
              name: 'supplier_name',
              placeholder: 'Supplier Name',
              value: formik.values?.supplier_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Quantity Ordered"
            formControlProps={{
              id: 'quantity_ordered',
              isInvalid: !!formik.errors?.quantity_ordered,
            }}
            name="quantity_ordered"
            error={formik.errors?.quantity_ordered}
            value={formik.values?.quantity_ordered}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity_ordered', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="order_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Order Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.order_date ? new Date(formik.values?.order_date) : null}
              onChange={(value: Date) => formik.setFieldValue('order_date', value)}
            />
          </FormControl>
          <FormControl id="expected_delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expected Delivery Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expected_delivery_date ? new Date(formik.values?.expected_delivery_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expected_delivery_date', value)}
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
              onClick={() => router.push('/supply-chains')}
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
    entity: 'supply_chain',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SupplyChainEditPage);
