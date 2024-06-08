import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { SingleFilePreview, Upload, UploadProps } from '../upload';

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

export function RHFUpload({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
          <Box>
              <Upload
                accept={{ 'image/*': [] }}
                file={field.value}
                error={!!error}
                helperText={helperText}
                {...other}
              />
            {field.value && typeof field.value === 'string' && (
              <SingleFilePreview imgUrl={field.value} />
            )}
          </Box>
        )}
    />
  );
}
