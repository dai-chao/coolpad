import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as studioDom from '../../../studioDom';
import DialogForm from '../../DialogForm';
import { useDom, useDomApi } from '../../DomLoader';

export interface CreateStudioPageDialogProps {
  appId: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateStudioPageDialog({
  appId,
  onClose,
  ...props
}: CreateStudioPageDialogProps) {
  const dom = useDom();
  const domApi = useDomApi();
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogForm
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          const newNode = studioDom.createNode(dom, 'page', {
            name,
            attributes: {
              title: studioDom.createConst(name),
              urlQuery: studioDom.createConst({}),
            },
          });
          const appNode = studioDom.getApp(dom);
          domApi.addNode(newNode, appNode, 'pages');

          onClose();
          navigate(`/app/${appId}/editor/pages/${newNode.id}`);
        }}
      >
        <DialogTitle>Create a new MUI Studio Page</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ my: 1 }}
            autoFocus
            fullWidth
            label="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!name}>
            Create
          </Button>
        </DialogActions>
      </DialogForm>
    </Dialog>
  );
}