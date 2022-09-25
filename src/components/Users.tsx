import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Skeleton } from './Skeleton';
import { Success } from './Success';
import { User } from './User';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface DataUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

interface UsersProps extends PropsWithChildren {
  items: DataUsers;
  isLoading: boolean;
}

export const Users: FC<UsersProps> = ({ items, isLoading }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [chooseUsers, setChooseUsers] = useState<IUser[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const addUserToList = (data: IUser, minus: boolean) => {
    if (minus) {
      setChooseUsers((prev) => prev.filter((item) => item.id !== data.id));
    } else {
      setChooseUsers((prev) => [...prev, data]);
    }
  };

  const isAdded = useCallback(
    (id: number) => {
      return !!chooseUsers.find((user) => user.id === id);
    },
    [chooseUsers]
  );

  const handleUserSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setFilteredUsers(
        items.data.filter(
          (item) =>
            item.first_name.toLowerCase().includes(value.toLowerCase()) ||
            item.last_name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 300);
  };

  useEffect(() => {
    if (items?.data?.length && !value.length) {
      setFilteredUsers(items.data);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [items, value]);

  if (isFinished) {
    return <Success count={chooseUsers.length} />;
  }

  return (
    <>
      <div className='search'>
        <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
        </svg>
        <input type='text' value={value} placeholder='Search User...' onChange={handleUserSearch} />
      </div>
      {isLoading ? (
        <div className='skeleton-list'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className='users-list'>
          {filteredUsers.map((item) => (
            <User data={item} key={item.id} addUser={addUserToList} isAdded={isAdded(item.id)} />
          ))}
        </ul>
      )}
      <button
        className='send-invite-btn'
        disabled={!chooseUsers.length}
        onClick={() => setIsFinished(true)}
      >
        Send invitation
      </button>
    </>
  );
};
