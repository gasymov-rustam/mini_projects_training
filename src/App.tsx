import { FC, useState } from 'react';
import cln from './App.module.scss';

interface AppProps {}

export const App: FC<AppProps> = () => {
  const [counter, setCounter] = useState<number>(0);

  const handleClick = (isDecrement: boolean) => () => {
    if (isDecrement) {
      setCounter((prev) => prev + 1);
    } else {
      setCounter((prev) => prev - 1);
    }
  };
  return (
    <div className={cln.App}>
      <div>
        <h2>Counter: </h2>
        <h1>{counter}</h1>
        <button className={cln.minus} onClick={handleClick(false)}>
          Minus
        </button>
        <button className={cln.plus} onClick={handleClick(true)}>
          Plus
        </button>
      </div>
    </div>
  );
};
