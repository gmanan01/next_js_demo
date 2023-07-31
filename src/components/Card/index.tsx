import { IBook } from '@/type/book';
import Link from 'next/link';
import PriceTag from '../PriceTag';

/* eslint-disable @next/next/no-img-element */
export default function BookCard({ bookDetail }: { bookDetail: IBook }) {
  return (
    <Link href={`/book/1`}>
      <div className="book-card w-full bg-white shadow-md rounded-md">
        <div className="card-image w-full	overflow-hidden p-2">
          <img
            src={bookDetail?.coverImage}
            className="max-w-full max-h-full mx-auto"
            alt="book"
          />
        </div>
        <div className="card-body p-2">
          <span className="font-semibold text-base sm:text-lg product-heading">
            {bookDetail?.title}
          </span>
          <div className="flex align-center justify-between">
            <span className="discount-price font-semibold text-base sm:text text-[#ff2056]">
              {bookDetail?.discountRate}&#37;
            </span>
            <span className="price font-bold text-base sm:text">
              <PriceTag price={bookDetail?.price} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
