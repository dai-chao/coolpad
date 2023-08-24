import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NodeId } from '@mui/toolpad-core';
import * as appDom from '../../../appDom';
import { useDom, useDomApi, useAppState, useAppStateApi } from '../../AppState';
import MapEntriesEditor from '../../../components/MapEntriesEditor';
import useBoolean from '../../../utils/useBoolean';
import useUnsavedChangesConfirm from '../../hooks/useUnsavedChangesConfirm';

export interface UrlQueryEditorProps {
  pageNodeId: NodeId;
}

export default function UrlQueryEditor({ pageNodeId }: UrlQueryEditorProps) {
  const { dom } = useDom();
  const { currentView } = useAppState();

  const domApi = useDomApi();
  const appStateApi = useAppStateApi();

  const page = appDom.getNode(dom, pageNodeId, 'page');

  const { value: isDialogOpen, setTrue: openDialog, setFalse: closeDialog } = useBoolean(false);

  const value = page.attributes.parameters;

  const [input, setInput] = React.useState(value);

  const hasUnsavedChanges = input !== value;

  React.useEffect(() => {
    if (isDialogOpen) {
      setInput(value);
    }
  }, [isDialogOpen, value]);

  const handleButtonClick = React.useCallback(() => {
    appStateApi.setView({
      kind: 'page',
      nodeId: pageNodeId,
      view: { kind: 'pageParameters' },
    });
  }, [appStateApi, pageNodeId]);

  const handleDialogClose = React.useCallback(() => {
    appStateApi.setView({ kind: 'page', nodeId: pageNodeId });
  }, [appStateApi, pageNodeId]);

  const { handleCloseWithUnsavedChanges } = useUnsavedChangesConfirm({
    hasUnsavedChanges,
    onClose: handleDialogClose,
  });

  const handleSave = React.useCallback(() => {
    domApi.update((draft) =>
      appDom.setNodeNamespacedProp(draft, page, 'attributes', 'parameters', input || []),
    );
    handleDialogClose();
  }, [domApi, handleDialogClose, input, page]);

  React.useEffect(() => {
    if (currentView.kind === 'page' && currentView.view?.kind === 'pageParameters') {
      openDialog();
    } else {
      closeDialog();
    }
  }, [closeDialog, currentView, openDialog]);

  return (
    <React.Fragment>
      <Button color="inherit" startIcon={<AddIcon />} onClick={handleButtonClick}>
        新增页面参数
      </Button>
      <Dialog fullWidth open={isDialogOpen} onClose={handleCloseWithUnsavedChanges}>
        <DialogTitle>编辑页面参数</DialogTitle>
        <DialogContent>
          <Typography>
            您在下面定义的参数将在{' '}
            <code>page.parameters</code> 全局变量。您可以在url中设置这些参数带有查询变量 (<code>?param=value</code>).
          </Typography>
          <MapEntriesEditor
            sx={{ my: 3 }}
            fieldLabel="参数"
            valueLabel="默认值"
            value={input || []}
            onChange={setInput}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="text" onClick={handleDialogClose}>
            关闭
          </Button>
          <Button disabled={value === input} onClick={handleSave}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
