import { FC, PropsWithChildren } from 'react';

interface SuccessProps extends PropsWithChildren {
  count: number;
}

export const Success: FC<SuccessProps> = ({ count }) => {
  return (
    <div className='success-block'>
      <img src='/assets/success.svg' alt='Success' />
      <h3>Success!</h3>
      <p>To all {count} users message was sent</p>
      <button className='send-invite-btn' onClick={() => window.location.reload()}>
        Return
      </button>
    </div>
  );
};
