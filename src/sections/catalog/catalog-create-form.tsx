import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Card, Grid, Stack, Typography } from '@mui/material';

import { RHFTextField } from 'src/components/hook-form';

import RenderUpload from './upload-card';

interface CreateCatalogFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateCatalogForm({ handleChange }: CreateCatalogFormProps) {
  const { control } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Controller
              name="name_uz"
              control={control}
              render={({ field }) => (
                <RHFTextField
                  {...field}
                  label="Name UZ"
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                />
              )}
            />

            <Controller
              name="name_ru"
              control={control}
              render={({ field }) => (
                <RHFTextField
                  {...field}
                  label="Name RU"
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                />
              )}
            />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RenderUpload name="image" error="Upload error message" />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
