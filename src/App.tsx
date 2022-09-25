import { FC, PropsWithChildren, useEffect, useState, useMemo, useRef } from 'react';

type ICategories = Record<'name', string>;

interface ICollection {
  category: number;
  name: string;
  photos: string[];
}

interface IData {
  categories: ICategories[];
  collections: ICollection[];
}
interface CollectionProps extends PropsWithChildren {
  name: string;
  images: string[];
}
// return <img key={item} className='collection__mini' src={images[2]} alt='Item' />;

const Collection: FC<CollectionProps> = ({ name, images }) => {
  return (
    <div className='collection'>
      <img className='collection__big' src={images[0]} alt='Item' />
      <div className='collection__bottom'>
        {images.reduce((total, item, idx) => {
          if (idx !== 0) {
            return [
              ...total,
              <img key={item} className='collection__mini' src={images[2]} alt='Item' />,
            ];
          }
          return total;
        }, [] as JSX.Element[])}
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export const App = () => {
  const [collection, setCollection] = useState<IData>({} as IData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const photos = useMemo(() => {
    const permanentCollection = collection?.collections?.reduce((total, item, idx) => {
      const searchInclude = item.name.toLowerCase().includes(searchValue);
      const search = selectedCategory
        ? item.category === selectedCategory && searchInclude
        : searchInclude;
      if (search) {
        return [
          ...total,
          <Collection key={item.name + idx} name={item.name} images={item.photos} />,
        ];
      }

      return total;
    }, [] as JSX.Element[]);
    const nextCollection = permanentCollection?.slice(page - 1, page + 1);
    setTotalPages(Math.round(permanentCollection?.length / 2));

    return nextCollection;
  }, [collection?.collections, page, searchValue, selectedCategory]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data.json');
        const data: IData = await response.json();

        setCollection(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (!Object.keys(collection).length) {
    return null;
  }

  return (
    <div className='App'>
      <h1>My collection</h1>
      <div className='top'>
        <ul className='tags'>
          {collection?.categories?.map((item, idx) => (
            <li
              className={idx === selectedCategory ? 'active' : ''}
              key={item.name}
              onClick={() => setSelectedCategory(idx)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          className='search-input'
          placeholder='Search by name'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
      </div>
      <div className='content'>
        {/* {isLoading ? 'Loading......' : !photos.length ? 'Not found' : photos} */}
        {isLoading ? 'Loading......' : photos}
      </div>
      <ul className='pagination'>
        {totalPages
          ? Array.from(Array(totalPages).keys(), (idx) => (
              <li
                key={idx}
                className={page === idx + 1 ? 'active' : ''}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
