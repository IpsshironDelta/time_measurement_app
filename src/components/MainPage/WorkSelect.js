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
            <MenuItem value="検査・梱包作業（単独）">検査・梱包作業（単独）</MenuItem>
            <MenuItem value="検査・梱包作業（複数人）">検査・梱包作業（複数人）</MenuItem>
            <MenuItem value="検査・ヘッダー付き">検査・ヘッダー付き</MenuItem>
            <MenuItem value="検査・圧着">検査・圧着</MenuItem>
            <MenuItem value="検査・化粧箱">検査・化粧箱</MenuItem>
            <MenuItem value="検査・ダンボール">検査・ダンボール</MenuItem>
            <MenuItem value="検査・ラベル">検査・ラベル</MenuItem>
            <MenuItem value="検査・作業・その他">検査・作業・その他</MenuItem>
            <MenuItem value="検査・評価・ダンボール組立">検査・評価・ダンボール組立</MenuItem>
            <MenuItem value="検査・評価・タンク梱包">検査・評価・タンク梱包</MenuItem>
            <MenuItem value="物流・棚入れ・在庫補充リスト作成">物流・棚入れ・在庫補充リスト作成</MenuItem>
            <MenuItem value="物流・棚入れ・在庫補充（整頓）">物流・棚入れ・在庫補充（整頓）</MenuItem>
            <MenuItem value="物流・棚入れ・製品入庫（高層）">物流・棚入れ・製品入庫（高層）</MenuItem>
            <MenuItem value="物流・棚入れ・製品入庫（パレット）">物流・棚入れ・製品入庫（パレット）</MenuItem>
            <MenuItem value="物流・作業・その他">物流・作業・その他</MenuItem>
            <MenuItem value="物流・出荷・全般作業">物流・出荷・全般作業</MenuItem>
            <MenuItem value="物流・出荷・単品">物流・出荷・単品</MenuItem>
            <MenuItem value="物流・出荷・同梱">物流・出荷・同梱</MenuItem>
            <MenuItem value="物流・出荷・業者 株式会社HAMASHO">物流・出荷・業者 株式会社HAMASHO</MenuItem>
            <MenuItem value="物流・出荷・業者 BOGMOTORCYCLE">物流・出荷・業者 BOGMOTORCYCLE</MenuItem>
            <MenuItem value="物流・出荷・業者 株式会社リバークレイン">物流・出荷・業者 株式会社リバークレイン</MenuItem>
            <MenuItem value="物流・出荷・業者 その他">物流・出荷・業者 その他</MenuItem>
            <MenuItem value="物流・伝票仕分け">物流・伝票仕分け</MenuItem>
            <MenuItem value="物流・評価・ハンドパレット">物流・評価・ハンドパレット</MenuItem>
            <MenuItem value="物流・評価・ピッキング">物流・評価・ピッキング</MenuItem>
            <MenuItem value="事務所・作業・その他">事務所・作業・その他</MenuItem>
            <MenuItem value="事務所・経理・その他">事務所・経理・その他</MenuItem>
            <MenuItem value="主任・作業・その他">主任・作業・その他</MenuItem>
        </Select>
        <FormHelperText>入力必須</FormHelperText>
      </FormControl>
    </Box>
  );
}
