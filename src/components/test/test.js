import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function NumberInputField() {
  const [value, setValue] = useState(1); // 初期値を1に設定

  // テキストフィールドの値が変更されたときの処理
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue >= 1 && newValue <= 200) {
      setValue(newValue);
    }
  };

  return (
    <TextField
      label="Number"
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
}
export default NumberInputField;