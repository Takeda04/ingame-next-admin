import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Stack, Input, Typography } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';

import { UploadIllustration } from "src/assets/illustrations";

interface RenderUploadProps {
  name: string;
  error?: string;
}

export default function RenderUpload({ name, error }: RenderUploadProps) {
  const { control } = useFormContext();

  const getPathFromMedia = (file: File) => URL.createObjectURL(file);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value } = field;
        return (
          <Stack
            spacing={3}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            sx={{ position: 'relative', width: '100%' }}
          >
            {value && value.length > 0 ? (
              <Box
                component="img"
                src={getPathFromMedia(value[0])}
                alt="Uploaded"
              />
            ) : (
              <>
                <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
                <Stack spacing={1} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">File Yuklang</Typography>
                  <Typography>
                    Fayl yuklash uchun
                    <Box
                      component="span"
                      sx={{
                        mx: 0.5,
                        color: "primary.main",
                        textDecoration: "underline",
                        cursor: 'pointer'
                      }}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      shu yerga
                    </Box>
                    bosing
                  </Typography>
                </Stack>
              </>
            )}

            {error && (
              <FormHelperText error>{error}</FormHelperText>
            )}

            <Input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                const { files } = e.target;
                if (files) {
                  field.onChange(files);
                }
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
