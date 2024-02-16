import './cartModal.css';
import { Button } from '../../common/button';
import { IoHeartOutline } from 'react-icons/io5';
import { useReducer } from 'react';
import {
  ActionAddProduct,
  AddProduct,
  TypesAddProduct,
} from '../../../utils/interfaces/product';

export interface ICartModalProps {
  price: string;
}

function reducer(state: AddProduct, action: ActionAddProduct): AddProduct {
  switch (action.type) {
    case TypesAddProduct.AddProduct: {
      return {
        price: state.price * 2,
        quantity: state.quantity + 1,
      };
    }
    case TypesAddProduct.SubtractProduct: {
      return {
        price: state.quantity === 1 ? state.price : state.price / 2,
        quantity: state.quantity === 1 ? 1 : state.quantity - 1,
      };
    }
    default: {
      return state;
    }
  }
}

export function CartModal(props: ICartModalProps) {
  const initialState: AddProduct = {
    price: parseFloat(props.price.slice(0, props.price.indexOf('€'))),
    quantity: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleClickAdd() {
    dispatch({ type: TypesAddProduct.AddProduct });
  }

  function handleClickSubtract() {
    dispatch({ type: TypesAddProduct.SubtractProduct });
  }

  return (
    <section className="modal-section">
      <section className="price-section">
        <p className="price">{state.price} €</p>
        <section className="quantity-section">
          <Button handle={handleClickSubtract} icon size="2rem">
            -
          </Button>
          <p>{state.quantity}</p>
          <Button handle={handleClickAdd} icon size="2rem">
            +
          </Button>
        </section>
      </section>
      <section className="btns-section">
        <button className="wish-btn">
          <IoHeartOutline stroke="#EEEED0" />
        </button>
        <Button size="2rem">Add to cart</Button>
      </section>
    </section>
  );
}
