import PriceTag from '@/components/PriceTag';
import { IBook } from '@/type/book';
import Link from 'next/link';

export default function BookDetail({ book }: { book: IBook }) {
  return (
    <div className="grid lg:container mx-auto book-list">
      <div className="grid grids-cols-1 p-3 topBar bg-white shadow-md">
        <h3 className="text-xl font-bold text-center">{book.title}</h3>
        <Link href="/book" className="backButton">
          <picture>
            <img
              src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
              className="w-full"
              alt="back"
            />
          </picture>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="product-img w-full bg-slate-200 overflow-hidden flex items-center justify-center">
          <picture>
            <img src={book.coverImage} className="w-max-full" alt="book" />
          </picture>
        </div>
        <div className="products-details py-3 px-4">
          <h3 className="text-2xl font-bold">{book.title} </h3>
          <p className="mt-2">{book.description}</p>
          <div className="flex align-center justify-between mt-3">
            <span className="discount-price font-semibold text-base sm:text text-[#ff2056]">
              {book.discountRate}&#37;
            </span>
            <span className="price font-bold text-base sm:text">
              <PriceTag price={book.price} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // If we have single node API then call here
  const book = {
    title: 'This is book',
    description: `위원은 정당에 가입하거나 정치에 관여할 수 없다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다. 헌법재판소에서 법률의 위헌결정.`,
    discountRate: 10,
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 100,
  };

  return { props: { book } };
}
