import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../store/games/reducer';
import { DataObject } from '../typs/progressBarTyps';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';

const ProgressGameInput: React.FC = () => {
  const dispatch = useDispatch();
  const [nameGame, setNameGame] = useState<string>('');
  const [points, setPoints] = useState<string>('');

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    name === 'nameGame' ? setNameGame(value) : setPoints(value);
  };

  const handleButtonClick = () => {
    if (points !== '') {
      const numericValue = parseFloat(points) as number;
      if (Number.isFinite(numericValue)) {
        const dataObject: DataObject = { id: uuidv4(), thresholdPoints: numericValue, name: nameGame, games: [] };
        dispatch(addData(dataObject));
        setPoints('');
      } else {
        console.error('Введите корректное число.');
      }
    }
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <Box>
      <TextField
        label="Название игры"
        type="text"
        name="nameGame"
        placeholder="Введите название игры"
        value={nameGame}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Прогресс"
        type="number"
        name="points"
        placeholder="Введите прогресс"
        value={points}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
        inputMode="numeric"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleButtonClick}>
        Сохранить
      </Button>
    </Box>
  );
};

export default ProgressGameInput;