import * as React from 'react';
import { styled } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface ToolpadShellProps {
  actions?: React.ReactNode;
  status?: React.ReactNode;
  children?: React.ReactNode;
}

const ToolpadShellRoot = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const ViewPort = styled('div')({
  flex: 1,
  width: '100%',
  overflow: 'auto',
  position: 'relative',
});

export default function ToolpadShell({ children, ...props }: ToolpadShellProps) {

  // 判断登录
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      console.log(token, 'token', navigate)
      navigate({
        pathname: `/app/pages/login`
      });
    }
  }, [])


  return (
    <ToolpadShellRoot>
      <Header {...props} />
      <ViewPort>{children}</ViewPort>
    </ToolpadShellRoot>
  );
}
