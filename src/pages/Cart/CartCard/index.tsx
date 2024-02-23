import './cartCard.css';
import {
  ActionAddProduct,
  Product,
  TypesAddProduct,
} from '../../../utils/interfaces/product';
import { IoHeartOutline, IoTrashOutline } from 'react-icons/io5';
import { ProductCart } from '../../../utils/interfaces/user';
import { useAuthContext } from '../../../context/AuthContext';
import { useReducer } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export interface ICartCardProps {
  product: Product;
  userOptions: ProductCart;
  render: Function;
}

export function CartCard(props: ICartCardProps) {
  const user = useAuthContext();
  const coverOption = props.product.options.find((o) => {
    return o.price === props.userOptions.option;
  })?.cover;
  const [state, dispatch] = useReducer(reducer, props.userOptions);

  function reducer(state: ProductCart, action: ActionAddProduct): ProductCart {
    const product = user.user?.cart.find(
      (p) => p.id === state.id
    ) as ProductCart;
    switch (action.type) {
      case TypesAddProduct.AddProduct: {
        const newState = {
          ...state,
          quantity: state.quantity + 1,
        };
        product.quantity = newState.quantity;
        props.render();
        return newState;
      }

      case TypesAddProduct.SubtractProduct: {
        const newState = {
          ...state,
          quantity: state.quantity === 1 ? 1 : state.quantity - 1,
        };
        product.quantity = newState.quantity;
        props.render();
        return newState;
      }

      default: {
        return state;
      }
    }
  }

  function handleClickSubtract() {
    dispatch({ type: TypesAddProduct.SubtractProduct });
  }

  function handleClickAdd() {
    dispatch({ type: TypesAddProduct.AddProduct });
  }

  function handleClickRemove() {
    const indexDelete = user.user?.cart.indexOf(props.userOptions)!;
    if (indexDelete === 0) {
      user.user?.cart.shift();
    } else {
      user.user?.cart.splice(indexDelete, indexDelete);
    }
    toast('Remove successfully!', {
      icon: '🗑️',
      style: {
        fontSize: '1.5rem',
      },
    });
    props.render();
  }

  return (
    <article className="cart-card">
      <Toaster />
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
          <IoTrashOutline
            onClick={handleClickRemove}
            className="icon primary-color"
          />
          <span className="actions-btns-section">
            <button onClick={handleClickSubtract} className="btn">
              -
            </button>
            {state.quantity}
            <button onClick={handleClickAdd} className="btn">
              +
            </button>
          </span>
        </section>
      </section>
    </article>
  );
}
