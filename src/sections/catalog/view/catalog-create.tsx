"use client"

import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Container } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CreateCatalogForm from '../catalog-create-form';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name_uz: Yup.string().required('Name (UZ) is required'),
  name_ru: Yup.string().required('Name (RU) is required'),
  image: Yup.mixed().required('Image is required'),
});

const defaultValue = {
  name_uz: "",
  name_ru: "",
  image: null,
}

// Define the type for the form data
interface CatalogFormData {
  name_uz: string;
  name_ru: string;
  image: FileList | null;
}

export default function CatalogCreateView() {
  const settings = useSettingsContext();
  const methods = useForm<CatalogFormData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue, // Set default values
  });
  const { handleSubmit, watch, setValue, reset } = methods;

  const [loading, setLoading] = useState(false);

  // handleChange function to update form values
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof CatalogFormData, value);
  }, [setValue]);

  // Watch all form fields and log changes (optional)
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        console.log(`${name} changed to: `, value[name]);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<CatalogFormData> = async (data) => {
    setLoading(true);
    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append('name_uz', data.name_uz);
      formData.append('name_ru', data.name_ru);

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]); // Append the first file
      }

      // Replace with your API endpoint
      await axios.post('/api/catalog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Failed to submit the form', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Katalog yaratish"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Katalog', href: paths.dashboard.control.list },
          { name: 'Yangi katalog' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <CreateCatalogForm handleChange={handleChange} />

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              Catalog yaratish
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </Container>
  );
}
