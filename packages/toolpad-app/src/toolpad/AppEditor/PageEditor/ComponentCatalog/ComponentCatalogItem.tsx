import * as React from 'react';
import Box from '@mui/material/Box';

import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ImageIcon from '@mui/icons-material/Image';
import GridOnIcon from '@mui/icons-material/GridOn';
import Crop75Icon from '@mui/icons-material/Crop75';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LayersIcon from '@mui/icons-material/Layers';
import DnsIcon from '@mui/icons-material/Dns';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import TabIcon from '@mui/icons-material/Tab';
import TuneIcon from '@mui/icons-material/Tune';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ListIcon from '@mui/icons-material/List';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import NotesIcon from '@mui/icons-material/Notes';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import InsightsIcon from '@mui/icons-material/Insights';
import { SvgIconProps } from '@mui/material/SvgIcon';
import PlaceIcon from '@mui/icons-material/Place';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import MoodIcon from '@mui/icons-material/Mood';
import HtmlIcon from '@mui/icons-material/Html';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TagIcon from '@mui/icons-material/Tag';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';

import { ButtonBase, SxProps } from '@mui/material';

const iconMap = new Map<string, React.ComponentType<SvgIconProps>>([
  ['Autocomplete', ManageSearchIcon],
  ['Text', NotesIcon],
  ['Button', SmartButtonIcon],
  ['Image', ImageIcon],
  ['DataGrid', GridOnIcon],
  ['TextField', Crop75Icon],
  ['Select', ArrowDropDownCircleIcon],
  ['List', ListIcon],
  ['Paper', LayersIcon],
  ['Form', DnsIcon],
  ['Card', SpaceDashboardSharpIcon],
  ['Tabs', TabIcon],
  ['Slider', TuneIcon],
  ['Switch', ToggleOnIcon],
  ['Radio', RadioButtonCheckedIcon],
  ['DatePicker', DateRangeIcon],
  ['FilePicker', UploadFileIcon],
  ['Checkbox', CheckBoxIcon],
  ['CodeComponent', DashboardCustomizeSharpIcon],
  ['CreateNew', AddIcon],
  ['Tabs', TabIcon],
  ['Container', AutoAwesomeMosaicIcon],
  ['Chart', InsightsIcon],
  ['Map', PlaceIcon],
  ['Drawer', ViewSidebarIcon],
  ['Icon', MoodIcon],
  ['Html', HtmlIcon],
  ['PageRow', TableRowsIcon],
  ['PageColumn', ViewColumnIcon],
  ['Metric', TagIcon],
]);

type ComponentItemKind = 'future' | 'builtIn' | 'create' | 'custom';

interface ComponentIconProps {
  id: string;
  kind?: ComponentItemKind;
  sx?: SxProps;
}

export function ComponentIcon({ id: componentId, kind, sx }: ComponentIconProps) {
  if(kind === 'custom' && componentId === "codeComponent.Card"){
    kind = "builtIn" 
    componentId = "Card"
  }
  const Icon = iconMap.get(kind === 'custom' ? 'CodeComponent' : componentId);
  return Icon ? <Icon sx={{ fontSize: 24, opacity: kind === 'future' ? 0.75 : 1, ...sx }} /> : null;
}

interface ComponentCatalogItemProps {
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onClick?: () => void;
  builtIn?: string;
  id: string;
  displayName: string;
  kind?: ComponentItemKind;
}

function ComponentCatalogItem({
  draggable,
  onClick,
  id,
  displayName,
  builtIn,
  kind,
  onDragStart,
}: ComponentCatalogItemProps) {

  const nameObj:any = {
    'Autocomplete':"自动完成",
    'Text':"文本",
    'Button':"按钮",
    'Image':"图片",
    'Data Grid':"数据表格",
    'Text Field':"输入框",
    'Select':"下拉选择",
    'List':"列表",
    'Paper':"容器",
    'Form':"表单",
    'Card':"Card",
    'Tabs':"标签页",
    'Date Picker':"时间选择",
    'File Picker':"文件选择",
    'Container':"容器",
    'Chart':"图表",
    'Metric':"公式",
  }

  return (
    <Box
      className="ComponentCatalogItem"
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      component={ButtonBase}
      sx={{
          fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        backgroundColor: 'paper',
        // https://stackoverflow.com/q/22922761
        transform: 'translate(0, 0)',
        // '&:hover': {
        //   backgroundColor: 'action.hover',
        // },
        ...(draggable ? { cursor: 'grab' } : {}),
        ...(onClick ? { cursor: 'pointer' } : {}),
      }}
    >
      <ComponentIcon id={id} kind={kind} sx={{
          backgroundColor: '#15dd15',
          p: 0.5,
          borderRadius: 1,
          width: 30,
          height: 30,
          color: 'white',

      }} />
      <span
        style={{
            marginTop: 2,
            fontWeight: 400,
          fontSize: '0.7rem',
          // maxWidth: builtIn ? 65 : 60,
          whiteSpace: 'nowrap',
          opacity: kind === 'future' ? 0.75 : 1,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {
          nameObj[displayName] || displayName
        }
      </span>
    </Box>
  );
}

export default ComponentCatalogItem;
