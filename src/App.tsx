import { FC, PropsWithChildren, useMemo, useState } from 'react';
import cln from './App.module.scss';

interface IQuestion {
  title: string;
  variants: string[];
  correct: number;
}

const questions: IQuestion[] = [
  {
    title: 'React is ... ?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'Component is ... ',
    variants: ['application', 'part of application or page', 'I don`t know'],
    correct: 1,
  },
  {
    title: 'What is it JSX?',
    variants: [
      'It is just HTML',
      'It is function',
      'It is same HTML, but with possibility to do JS-код',
    ],
    correct: 2,
  },
];

const helper = (length: number, step: number) => `${(100 / length) * step}%`;

interface IResult extends PropsWithChildren {
  setStep: (index?: number) => void;
  correctResult: number;
}

const Result: FC<IResult> = ({ setStep, correctResult }) => {
  return (
    <div className={cln['result']}>
      <img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' alt='' />
      <h2>
        You did {correctResult} answers from {questions.length}
      </h2>
      <a href='/'>
        <button>Try again!</button>
      </a>
    </div>
  );
};

interface IGame extends PropsWithChildren {
  question: IQuestion;
  step: number;
  setStep: (index?: number) => void;
}

const Game: FC<IGame> = ({ question, setStep, step }) => {
  return (
    <>
      <div className={cln.progress}>
        <div
          style={{ width: helper(questions.length, step) }}
          className={cln['progress__inner']}
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) => (
          <li key={item} onClick={() => setStep(index)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export const App = () => {
  const [step, setStep] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const question = useMemo(() => questions[step], [step]);

  const handleClick = (index?: number) => {
    setStep((prev) => prev + 1);

    if (index === question.correct) {
      setCorrect((prev) => prev + 1);
    }
  };

  return (
    <div className={cln.App}>
      {question ? (
        <Game question={question} setStep={handleClick} step={step} />
      ) : (
        <Result setStep={handleClick} correctResult={correct} />
      )}
    </div>
  );
};
