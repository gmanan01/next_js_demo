import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import { IBook } from '../../type/book';
import BookCard from '@/components/Card';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { AvatarState } from '@/state/atom';

export default function Book() {
  const avatar = useRecoilValue(AvatarState);
  const [page, setPage] = useState<number>(1);
  const [bookList, setBookList] = useState<IBook[]>([]);
  const router = useRouter();
  const resetList = useResetRecoilState(AvatarState);

  const fetchData = async (id: number) => {
    const response = await axios.get('/api/getBooks', {
      params: { page: id },
    });
    return response.data;
  };

  const { data, isLoading } = useQuery(
    ['getBooks', page],
    () => fetchData(page),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (data) {
      setBookList((oldBookList) => [...oldBookList, ...data?.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      if (document.body.clientHeight < window.innerHeight) {
        setPage(page + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const refresh = () => {
    resetList();
    router.reload();
  };

  return (
    <div>
      <div className="grid grids-cols-1 p-3 topBar bg-white shadow-md ">
        <h3 className="text-xl font-bold text-center mb-2">Books</h3>
        <div className="avatar">
          <picture>
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src={avatar.src}
              alt="avatar"
            />
          </picture>
        </div>
      </div>
      {!isLoading && (
        <InfiniteScroll
          dataLength={bookList.length}
          next={fetchNextPage}
          hasMore={data?.hasNext}
          loader={
            <p className="p-3 text-center font-sm opacity-75">Loading...</p>
          }
          endMessage={
            <p className="p-3 text-center font-sm opacity-75">
              No more items to load
            </p>
          }
          scrollThreshold={0.8}
          pullDownToRefresh
          pullDownToRefreshThreshold={60}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
          refreshFunction={refresh}
        >
          <div className="sm:container mx-2 sm:mx-auto ">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 xl:gap-5">
              {!isLoading &&
                bookList.length > 0 &&
                bookList.map((book: IBook, index: number) => {
                  return <BookCard bookDetail={book} key={index} />;
                })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
