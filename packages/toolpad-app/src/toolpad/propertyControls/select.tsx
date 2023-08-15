import {FormControl, MenuItem, TextField, Typography} from '@mui/material';
import * as React from 'react';
import type { EditorProps } from '../../types';
import PropertyControl from '../../components/PropertyControl';

function SelectPropEditor({ label, propType, value, onChange, disabled }: EditorProps<string>) {
  const items = propType.type === 'string' ? propType.enum ?? [] : [];
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
                select
                value={value ?? ''}
                disabled={disabled}
                onChange={handleChange}
            >
                {typeof propType.default === 'undefined' ? <MenuItem value="">-</MenuItem> : null}
                {items.map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    </PropertyControl>
  );
}

export default SelectPropEditor;
