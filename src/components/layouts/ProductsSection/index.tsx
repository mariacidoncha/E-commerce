import './productsSection.css';
import { ReactNode } from 'react';
import { ProductCard } from './ProductCard';
import { useProductContext } from '../ProductContext';

export interface IProductsSectionProps {
  max?: number;
}

export function ProductsSection(props: IProductsSectionProps): ReactNode {
  const products = useProductContext();
  const max = props.max ? props.max : products.products.length;
  const showProducts = products.products.slice(0, max);

  return (
    <section className="popular-items">
      {showProducts.map(({ id, image, name, author, rate, options }) => {
        return (
          <ProductCard
            key={id}
            id={id}
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
