import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { EmptyBucket1, EmptyBucket2 } from '../assets/icons';

const Bucket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  const toggleBucket = () => {
    setIsOpen(!isOpen);
  };

  const closeBucket = () => {
    setIsOpen(false);
  };

  const addToBucket = (item) => {
    setItems([...items, item]);
  };

  const removeFromBucket = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="relative">
      <button onClick={toggleBucket} className="hover:border p-2 rounded">
        <FaShoppingCart size={25} />
        {items.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[60%] right-[-40%]">
            {items.length}
          </span>
        )}
      </button>

      {/* Попап корзины */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Кошик</h2>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={closeBucket}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {items.length > 0 ? (
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{item.name}</span>
                  <button onClick={() => removeFromBucket(index)}>
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            // <div className="absolute left-[35%] top-[25%] max-md:top-[30%]  max-md:left-[20%]">
            //   <img
            //     src={EmptyBucket1}
            //     alt="Порожній кошик"
            //     className="w-[40%] max-md:w-[60%]"
            //   />
            //   <p className="absolute left-[10%] font-bold">Кошик порожній</p>
            // </div>
            <div className="absolute left-[34%] top-[18%] max-md:top-[30%]  max-md:left-[30%]">
              <img
                src={EmptyBucket2}
                alt="Порожній кошик"
                className="w-[50%] max-md:w-[60%]"
              />
              <p className="absolute left-[10%] max-md:left-[0%] font-bold">
                Кошик порожній
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bucket;
