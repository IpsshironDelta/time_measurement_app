import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">業務を選択</InputLabel>
        <Select
          id        = {props.id}
          value     = {props.value}
          label     = {props.label}
          onChange  = {props.onChange}>
            <MenuItem value="入庫">入庫</MenuItem>
            <MenuItem value="棚卸">棚卸</MenuItem>
            <MenuItem value="出荷">出荷</MenuItem>
            <MenuItem value="社内業務">社内業務</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
