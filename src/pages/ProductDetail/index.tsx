import { useParams } from 'react-router-dom';
import { useProductContext } from '../../components/layouts/ProductContext';
import { NavBar } from '../../components/layouts/NavBar';

export interface IProductDetailProps {}

export function ProductDetail(props: IProductDetailProps) {
  const products = useProductContext();
  const { item } = useParams();
  const showProduct = products.products.find((p) => p.id === item);

  return (
    <>
      <h2>{showProduct?.name}</h2>

      <NavBar />
    </>
  );
}
