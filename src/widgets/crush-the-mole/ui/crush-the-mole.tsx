import { useEffect, useRef, useState } from 'react';
import { Mole, MolePosition } from '@/entities/mole';
import { getRandomNum } from '@/shared/libs';

import styles from './crush-the-mole.module.scss';

type CrushTheMoleProps = {
  rows: number;
  cols: number;
};

const CrushTheMole = ({ rows, cols }: CrushTheMoleProps) => {
  const [activeMole, setActiveMole] = useState<MolePosition | null>(null);
  const timer = useRef<NodeJS.Timeout>(null);

  const startGame = () => {
    updateActiveMole();
  };

  const endGame = () => {
    setActiveMole(null);
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const updateActiveMole = () => {
    const newX = getRandomNum(rows);
    const newY = getRandomNum(cols);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    setActiveMole(null);

    timer.current = setTimeout(() => {
      setActiveMole({ x: newX, y: newY });
    }, getRandomNum(1000));
  };

  const handleMoleClick = (active: boolean) => {
    if (active) {
      updateActiveMole();
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        {Array.from({ length: rows }).map((_, x) => (
          <div className={styles.row}>
            {Array.from({ length: cols }).map((_, y) => (
              <Mole
                key={`${x}-${y}`}
                isActive={x === activeMole?.x && y === activeMole?.y}
                onClick={handleMoleClick}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={startGame}>Начать игру</button>
      <button onClick={endGame}>Закончить игру</button>
    </div>
  );
};

export default CrushTheMole;
