import { FC, useState } from 'react';
import cln from './App.module.scss';

interface ModalWindowProps {
  visible: boolean;
  setVisible: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ setVisible, visible }) => {
  return (
    <div className={`${cln.overlay} ${cln.animated} ${visible ? cln.show : ''}`}>
      <div className={cln.modal}>
        <svg height='200' viewBox='0 0 200 200' width='200' onClick={setVisible}>
          <title />
          <path d='M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z' />
        </svg>
        <img src='https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif' alt='' />
      </div>
    </div>
  );
};

export const App = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisibleClick = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className={cln.App}>
      <button className={cln['open-modal-btn']} onClick={handleVisibleClick}>
        ✨ Open window
      </button>
      <ModalWindow setVisible={handleVisibleClick} visible={visible} />
    </div>
  );
};
