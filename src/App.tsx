import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Users } from './components';
import { DataUsers } from './components/Users';

interface AppProps extends PropsWithChildren {}

export const App: FC<AppProps> = () => {
  const [usersData, setUsersData] = useState<DataUsers>({} as DataUsers);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const data: DataUsers = await response.json();

        setUsersData(data);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className='App'>
      <Users isLoading={isLoading} items={usersData} />
      {/* <Success /> */}
    </div>
  );
};
