import './cartCard.css';
import { Product } from '../../../utils/interfaces/product';
import { IoHeartOutline, IoTrashOutline } from 'react-icons/io5';
import { ProductCart } from '../../../utils/interfaces/user';
import { useAuthContext } from '../../../context/AuthContext';

export interface ICartCardProps {
  product: Product;
  userOptions: ProductCart;
}

export function CartCard(props: ICartCardProps) {
  const user = useAuthContext();
  const coverOption = props.product.options.find((o) => {
    return o.price === props.userOptions.option;
  })?.cover;

  function handleClickSubtract() {
    //TODO: eliminar un item del carrito si llega a 0
    const changeItem = user.user?.cart.find((e) => {
      return e.id.toString() === props.product.id;
    })!;
    console.log('🚀 ~ changeItem ~ changeItem:', changeItem);

    // if (changeItem?.quantity === 1) {
    //   user.user?.cart = user.user?.cart.filter((e) => e !== changeItem);
    // } else {
    //   changeItem.quantity = changeItem.quantity - 1;
    // }
  }

  return (
    <article className="cart-card">
      <img src={props.product.image} alt={`${props.product.name} image`} />
      <section className="product-info">
        <p className="product-name">{props.product.name}</p>
        <p>{props.product.author.name}</p>
        <section className="product-option">
          <p className="product-cover">{coverOption}</p>
          <p className="primary-color">{props.userOptions.option} €</p>
        </section>
        <section className="product-actions">
          <IoHeartOutline className="icon" />
          <IoTrashOutline className="icon primary-color" />
          <span className="actions-btns-section">
            <button onClick={handleClickSubtract} className="btn">
              -
            </button>
            {props.userOptions.quantity}
            <button className="btn">+</button>
          </span>
        </section>
      </section>
    </article>
  );
}
