import {FormControl, TextField, Typography} from '@mui/material';
import * as React from 'react';
import type { EditorProps } from '../../types';
import PropertyControl from '../../components/PropertyControl';

function StringPropEditor({ propType, label, value, onChange, disabled }: EditorProps<string>) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value || undefined);
    },
    [onChange],
  );

  return (
    <PropertyControl propType={propType}>
        <FormControl sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <Typography variant="body2" sx={{
                flexBasis: '1',
                flexShrink: '1',
                marginRight: 2,
            }}>{label}</Typography>
            <TextField
                value={value ?? ''}
                disabled={disabled}
                onChange={handleChange}
            />
        </FormControl>
    </PropertyControl>
  );
}

export default StringPropEditor;
