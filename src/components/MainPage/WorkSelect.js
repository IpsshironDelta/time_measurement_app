import * as React           from 'react';
import Box                  from '@mui/material/Box';
import InputLabel           from '@mui/material/InputLabel';
import MenuItem             from '@mui/material/MenuItem';
import FormControl          from '@mui/material/FormControl';
import FormHelperText       from '@mui/material/FormHelperText';
import Select, 
      { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">業務を選択</InputLabel>
        <Select
          id           = {props.id}
          value        = {props.value}
          label        = {props.label}
          onChange     = {props.onChange}>
            <MenuItem value="入庫作業">入庫作業</MenuItem>
            <MenuItem value="受け入れ作業">受け入れ作業</MenuItem>
            <MenuItem value="棚卸作業">棚卸作業</MenuItem>
            <MenuItem value="廃棄作業">廃棄作業</MenuItem>
            <MenuItem value="出荷作業">出荷作業</MenuItem>
            <MenuItem value="事務作業">事務作業</MenuItem>
            <MenuItem value="経理作業">経理作業</MenuItem>
            <MenuItem value="検品作業">検品作業</MenuItem>
        </Select>
        <FormHelperText>入力必須</FormHelperText>
      </FormControl>
    </Box>
  );
}
