import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../store/games/reducer';
import { DataObject } from '../typs/ProgressBar';

const ProgressGameInput: React.FC = () => {
  const dispatch = useDispatch();
  const [nameGame, setNameGame] = useState<string>('');
  const [points, setPoints] = useState<string>('');

  const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'nameGame') {
      setNameGame(value);
    } else if (name === 'points') {
      setPoints(value);
    }
  };

  const handleButtonClick = () => {
    if (points !== '') {
      const numericValue = parseFloat(points) as number;
      if (!Number.isNaN(numericValue)) {
        const dataObject: DataObject = { thresholdPoints: numericValue, name: nameGame, games: [] };
        dispatch(addData(dataObject));
        setPoints('');
      } else {

        alert('Введите корректное число.');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        name="nameGame"
        placeholder="Введите название игры"
        value={nameGame}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="points"
        placeholder="Введите прогресс"
        value={points}
        onChange={handleInputChange}
        inputMode="numeric"
      />
      <button onClick={handleButtonClick}>Сохранить</button>
    </div>
  );
};

export default ProgressGameInput;
