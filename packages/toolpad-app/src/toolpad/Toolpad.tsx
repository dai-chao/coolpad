import { CircularProgress, Box, styled, CssBaseline } from '@mui/material';
import * as React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import NoSsr from '../components/NoSsr';
import AppEditor from './AppEditor';
import ErrorAlert from './AppEditor/PageEditor/ErrorAlert';
import { ThemeProvider } from '../ThemeContext';

import Login from "./ToolpadShell/Login/index"

const Centered = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function FullPageLoader() {
  return (
    <Centered>
      <CircularProgress />
    </Centered>
  );
}

interface FullPageErrorProps {
  error: Error;
}

function FullPageError({ error }: FullPageErrorProps) {
  return (
    <Centered>
      <ErrorAlert error={error} />
    </Centered>
  );
}

function ErrorFallback({ error }: FallbackProps) {
  return <FullPageError error={error} />;
}

export interface ToolpadProps {
  basename: string;
}

export default function Toolpad({ basename }: ToolpadProps) {
  return (
    <NoSsr>
      <ThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* Container that allows children to size to it with height: 100% */}
        <Box sx={{ height: '1px', minHeight: '100vh' }}>
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <React.Suspense fallback={<FullPageLoader />}>
              <BrowserRouter basename={basename}>
                <Routes>
                  <Route
                    path={`/app/pages/login`}
                    element={<Login />}
                  />
                  <Route path="/*" element={<AppEditor />} />
                </Routes>
              </BrowserRouter>
            </React.Suspense>
          </ErrorBoundary>
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
}
