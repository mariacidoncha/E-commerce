import './cartModal.css';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '../../common/button';
import { IoHeartOutline } from 'react-icons/io5';
import { useReducer } from 'react';
import {
  ActionAddProduct,
  AddProduct,
  TypesAddProduct,
} from '../../../utils/interfaces/product';
import { useAuthContext } from '../../../context/AuthContext';

export interface ICartModalProps {
  price: string;
  idProduct: string;
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
  const user = useAuthContext();

  function handleClickAdd() {
    dispatch({ type: TypesAddProduct.AddProduct });
  }

  function handleClickSubtract() {
    dispatch({ type: TypesAddProduct.SubtractProduct });
  }

  function handleClickAddProduct() {
    const added = user.user?.cart.find((e) => {
      return e.id.toString() === props.idProduct;
    });

    if (!added) {
      user.user?.cart.push({
        id: parseInt(props.idProduct),
        quantity: state.quantity,
      });
      toast.success('Successfully added!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
    } else {
      toast.success('Successfully added!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
      added.quantity = added.quantity + state.quantity;
    }
  }

  return (
    <section className="modal-section">
      <section className="price-section">
        <Toaster />
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
        <Button handle={handleClickAddProduct} size="2rem">
          Add to cart
        </Button>
      </section>
    </section>
  );
}
