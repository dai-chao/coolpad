import * as React from 'react';
import { Box, Collapse, darken, IconButton, Link, styled, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import invariant from 'invariant';
import ComponentCatalogItem from './ComponentCatalogItem';
import CreateCodeComponentNodeDialog from '../../HierarchyExplorer/CreateCodeComponentNodeDialog';
import * as appDom from '../../../../appDom';
import { useDom } from '../../../AppState';
import { usePageEditorApi } from '../PageEditorProvider';
import { useToolpadComponents } from '../../toolpadComponents';
import useLocalStorageState from '../../../../utils/useLocalStorageState';
import { CustomContext, CustomDispatchContext } from '../../../CustomContext';

interface FutureComponentSpec {
  url: string;
  displayName: string;
}

const FUTURE_COMPONENTS = new Map<string, FutureComponentSpec>([
  ['Chart', { url: 'https://github.com/mui/mui-toolpad/issues/789', displayName: 'Chart' }],
  ['Map', { url: 'https://github.com/mui/mui-toolpad/issues/864', displayName: 'Map' }],
  ['Drawer', { url: 'https://github.com/mui/mui-toolpad/issues/1540', displayName: 'Drawer' }],
  ['Html', { url: 'https://github.com/mui/mui-toolpad/issues/1311', displayName: 'Html' }],
  ['Icon', { url: 'https://github.com/mui/mui-toolpad/issues/83', displayName: 'Icon' }],
  ['Card', { url: 'https://github.com/mui/mui-toolpad/issues/748', displayName: 'Card' }],
  ['Slider', { url: 'https://github.com/mui/mui-toolpad/issues/746', displayName: 'Slider' }],
  ['Switch', { url: 'https://github.com/mui/mui-toolpad/issues/745', displayName: 'Switch' }],
  ['Radio', { url: 'https://github.com/mui/mui-toolpad/issues/744', displayName: 'Radio' }],
  ['Checkbox', { url: 'https://github.com/mui/mui-toolpad/issues/742', displayName: 'Checkbox' }],
]);

const WIDTH_COLLAPSED = 40;

const ComponentCatalogRoot = styled('div')({
  position: 'relative',
  width: WIDTH_COLLAPSED + 1,
  height: '100%',
  zIndex: 1,
  overflow: 'visible',
});

export interface ComponentCatalogProps {
  className?: string;
}

export default function ComponentCatalog({ className }: ComponentCatalogProps) {
  const api = usePageEditorApi();
  const { dom } = useDom();

  const state = React.useContext(CustomContext);

  const [openStart, setOpenStart] = React.useState(0);

    React.useEffect(() => {
        setOpenStart(state?.componentsOpen === true ? Date.now() : 0)
    }, [state?.componentsOpen])

  const [openCustomComponents, setOpenCustomComponents] = useLocalStorageState(
    'catalog-custom-expanded',
    true,
  );
  const [openFutureComponents, setOpenFutureComponents] = useLocalStorageState(
    'catalog-future-expanded',
    true,
  );

  const closeTimeoutRef = React.useRef<NodeJS.Timeout>();
  const openDrawer = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenStart(Date.now());
  }, []);

  const closeDrawer = React.useCallback(
    (delay?: number) => {
        return;
      const timeOpen = Date.now() - openStart;
      const defaultDelay = timeOpen > 750 ? 500 : 0;
      closeTimeoutRef.current = setTimeout(() => setOpenStart(0), delay ?? defaultDelay);
    },
    [openStart],
  );

  const handleDragStart = (componentType: string) => (event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.dropEffect = 'copy';
    const newNode = appDom.createElement(dom, componentType, {});
    api.newNodeDragStart(newNode);
    closeDrawer(0);
  };

  const toolpadComponents = useToolpadComponents(dom);

  // const handleMouseEnter = React.useCallback(() => openDrawer(), [openDrawer]);
  // const handleMouseLeave = React.useCallback(() => closeDrawer(), [closeDrawer]);

  const [createCodeComponentDialogOpen, setCreateCodeComponentDialogOpen] = React.useState(false);

  const handleCreateCodeComponentDialogOpen = React.useCallback(() => {
    setCreateCodeComponentDialogOpen(true);
    closeDrawer(0);
  }, [closeDrawer]);
  const handleCreateCodeComponentDialogClose = React.useCallback(
    () => setCreateCodeComponentDialogOpen(false),
    [],
  );

  return (
    <React.Fragment>
      <ComponentCatalogRoot
        data-testid="component-catalog"
        className={className}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            bottom: 0,
            backgroundColor: 'background.default',
            borderRight: 1,
            borderColor: 'divider',
          }}
        >
          <Collapse
            in={!!openStart}
            orientation="horizontal"
            timeout={200}
            sx={{ height: '100%', justifyContent: 'flex-end', display: 'flex' }}
          >
            <Box
              sx={{
                width: 250,
                height: '100%',
                overflow: 'auto',
                scrollbarGutter: 'stable',
              }}
            >
                <Typography variant="h2" sx={{ p: 1, fontSize: 19, pt: 2, textAlign: 'center' }}>
                    Insert Component
                </Typography>
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2} padding={1}>
                {Object.entries(toolpadComponents).map(([componentId, componentType]) => {
                  invariant(componentType, `No component definition found for "${componentId}"`);
                  return componentType.builtIn && !componentType.system ? (
                    <ComponentCatalogItem
                      key={componentId}
                      id={componentId}
                      draggable
                      onDragStart={handleDragStart(componentId)}
                      displayName={componentType.displayName}
                      builtIn={componentType.builtIn}
                      kind={'builtIn'}
                    />
                  ) : null;
                })}
              </Box>

              <Box
                pl={2}
                pr={1.5}
                pb={0}
                display="flex"
                flexDirection={'row'}
                justifyContent="space-between"
              >
                <Typography variant="overline">Custom Components</Typography>
                <IconButton
                  aria-label="Expand custom components"
                  sx={{
                    p: 0,
                    height: '100%',
                    alignSelf: 'center',
                    cursor: 'pointer',
                    transform: `rotate(${openCustomComponents ? 180 : 0}deg)`,
                    transition: 'all 0.2s ease-in',
                  }}
                  onClick={() => setOpenCustomComponents((prev) => !prev)}
                >
                  <ArrowDropDownSharpIcon />
                </IconButton>
              </Box>
              <Collapse in={openCustomComponents} orientation={'vertical'}>
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1} padding={1} pt={0}>
                  {Object.entries(toolpadComponents).map(([componentId, componentType]) => {
                    invariant(componentType, `No component definition found for "${componentId}"`);
                    return !componentType.builtIn ? (
                      <ComponentCatalogItem
                        key={componentId}
                        id={componentId}
                        draggable
                        onDragStart={handleDragStart(componentId)}
                        displayName={componentType.displayName}
                        kind={'custom'}
                      />
                    ) : null;
                  })}
                  <ComponentCatalogItem
                    id="CreateNew"
                    displayName="Create"
                    kind="create"
                    onClick={handleCreateCodeComponentDialogOpen}
                  />
                </Box>
              </Collapse>
            </Box>
          </Collapse>
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: 'flex',*/}
          {/*    flexDirection: 'column',*/}
          {/*    alignItems: 'center',*/}
          {/*    width: WIDTH_COLLAPSED,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Box sx={{ mt: 2 }}>{openStart ? <ArrowLeftIcon /> : <ArrowRightIcon />}</Box>*/}
          {/*  <Box position="relative">*/}
          {/*    <Typography*/}
          {/*      sx={{*/}
          {/*        position: 'absolute',*/}
          {/*        top: 0,*/}
          {/*        display: 'flex',*/}
          {/*        alignItems: 'center',*/}
          {/*        fontSize: 20,*/}
          {/*        transform: 'rotate(90deg) translate(-10px, 0)',*/}
          {/*        transformOrigin: '0 50%',*/}
          {/*        whiteSpace: 'nowrap',*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      Component library*/}
          {/*    </Typography>*/}
          {/*  </Box>*/}
          {/*</Box>*/}
        </Box>
      </ComponentCatalogRoot>
      <CreateCodeComponentNodeDialog
        open={!!createCodeComponentDialogOpen}
        onClose={handleCreateCodeComponentDialogClose}
      />
    </React.Fragment>
  );
}
