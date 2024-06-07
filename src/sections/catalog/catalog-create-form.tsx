import * as Yup from 'yup';
import {  useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import { RHFUpload } from 'src/components/hook-form/rhf-upload';
import FormProvider, { RHFTextField } from 'src/components/hook-form';




export default function CatalogCreateForm() {

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewCatalogSchema = Yup.object().shape({
    parent_id: Yup.number().required('Требуется Id'),
    name_uz: Yup.string().required('Требуется имя'),
    name_ru: Yup.string().required('Требуется имя'),
    image: Yup.array().min(1, 'Требуется изображение').max(1, 'Разрешено только одно изображение'),
  });

  const methods = useForm({
    resolver: yupResolver(NewCatalogSchema),
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(endpoints.dashboard.catalog, data);
      reset();
      enqueueSnackbar('Успешно создано!');
      console.info('DATA', data);

      // router.push(paths.dashboard.control.list);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.image || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('image', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.image]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        values.image && values.image.filter((file: string | File) => file !== inputFile);
      setValue('image', filtered);
    },
    [setValue, values.image]
  );

  const renderDetails = (
    <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Название UZB</Typography>
              <RHFTextField name="name_uz" placeholder="Ex: Monitorlar..." />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Название RUS</Typography>
              <RHFTextField name="name_ru" placeholder="Ex: Monitorlar..." />
            </Stack>

            <Stack spacing={1.5}>
            <Typography variant="subtitle2">Rasm</Typography>
            <RHFUpload
              name="image"
                maxSize={9999999}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onUpload={() => console.info('ON UPLOAD')}
            />
            </Stack>
          </Stack>
        </Card>
      </Grid>
  );



  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: "end" }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          Katalog yaratish
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
