import './products.css';
import { ReactNode, useEffect, useState } from 'react';
import { getProducts } from '../../../utils';
import { Product } from '../../../utils/interfaces/product';
import { ProductCard } from './ProductCard';

export function Products(): ReactNode {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    async function setUsersAPI() {
      const response = await getProducts();
      setProducts(response);
    }

    setUsersAPI();
  }, []);

  console.log(products);

  return (
    <>
      <section className="popular-header">
        <h3>Most popular</h3>
        <a href="#">See all</a>
      </section>
      <section className="popular-items">
        {products.map(({ id, image, name, author, rate, options }) => {
          return (
            <ProductCard
              key={id}
              image={image}
              name={name}
              author={author.name}
              price={options[0].price}
              rating={rate}
            />
          );
        })}
      </section>
    </>
  );
}
