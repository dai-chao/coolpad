import * as React from 'react';
import { Stack, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../toolpad/ToolpadShell/Header';
import { ThemeProvider } from '../ThemeContext';

export interface PreviewHeaderProps {
  pageId?: string;
}

export default function PreviewHeader({ pageId }: PreviewHeaderProps) {
  return (
    <ThemeProvider>
      <Header
        enableUserFeedback={false}
        actions={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: 'primary.main' }}>
              这是预览版本
            </Typography>
            <Button
              variant="outlined"
              endIcon={<EditIcon />}
              color="primary"
              component="a"
              href={pageId ? `/_toolpad/app/pages/${pageId}` : '/_toolpad/app'}
            >
              编辑
            </Button>
          </Stack>
        }
      />
    </ThemeProvider>
  );
}
