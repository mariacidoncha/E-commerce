import './productsSection.css';
import { ReactNode, useEffect, useState } from 'react';
import { getProducts } from '../../../utils';
import { Product } from '../../../utils/interfaces/product';
import { ProductCard } from './ProductCard';

export interface IProductsSectionProps {
  max?: number;
}

export function ProductsSection(props: IProductsSectionProps): ReactNode {
  const [products, setProducts] = useState([] as Product[]);
  const max = props.max ? props.max : products.length;
  const showProducts = products.slice(0, max);

  useEffect(() => {
    async function setUsersAPI() {
      const response = await getProducts();
      setProducts(response);
    }

    setUsersAPI();
  }, []);

  console.log(products);

  return (
    <section className="popular-items">
      {showProducts.map(({ id, image, name, author, rate, options }) => {
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
  );
}
