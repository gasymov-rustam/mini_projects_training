import { FC, PropsWithChildren, useEffect, useState, useRef } from 'react';
import { Block } from './Block';

interface AppProps extends PropsWithChildren {}

type IRates = Record<string, number>;
interface ICurrency {
  table: string;
  rates: IRates;
}
export const App: FC<AppProps> = () => {
  const rates = useRef<IRates>({});
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState<number>(0);
  const [toPrice, setToPrice] = useState<number>(1);

  const onChangeFromPrice = (value: number) => {
    const price = value / rates.current[fromCurrency];
    const result = price * rates.current[toCurrency];
    setFromPrice(value);
    setToPrice(+result.toFixed(3));
  };

  const onChangeToPrice = (value: number) => {
    const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * value;
    setToPrice(value);
    setFromPrice(+result.toFixed(3));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://cdn.cur.su/api/latest.json');
        const data: ICurrency = await response.json();

        rates.current = data.rates;
        onChangeToPrice(1);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fromPrice) {
      onChangeFromPrice(fromPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency]);

  useEffect(() => {
    if (toPrice && fromPrice) {
      onChangeToPrice(toPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency, fromPrice]);

  return (
    <div className='App'>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />

      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};
