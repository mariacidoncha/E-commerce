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
import { UserOptions } from '../../../utils/interfaces/user';
import { FaHeart } from 'react-icons/fa';

export interface ICartModalProps {
  idProduct: string;
  userOptions: UserOptions;
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
    price: props.userOptions.price,
    quantity: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useAuthContext();
  const wished = user.user?.wishlist.find(
    (p) => p.toString() === props.idProduct
  );

  function handleClickAdd() {
    dispatch({ type: TypesAddProduct.AddProduct });
  }

  function handleClickSubtract() {
    dispatch({ type: TypesAddProduct.SubtractProduct });
  }

  function handleClickAddWish() {
    const added = user.user?.wishlist.find((e) => {
      return e.toString() === props.idProduct;
    });

    if (!added) {
      user.user?.wishlist.push(parseInt(props.idProduct));
      toast.success('Successfully added!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
    } else {
      toast.error('This product is on your wishlist yet!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
    }
  }

  function handleClickAddProduct() {
    const added = user.user?.cart.find((e) => {
      return (
        e.id.toString() === props.idProduct &&
        e.option === props.userOptions.price
      );
    });

    if (!added) {
      user.user?.cart.push({
        id: parseInt(props.idProduct),
        quantity: state.quantity,
        option: props.userOptions.price,
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
        <p className="price">{props.userOptions.price} €</p>
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
        <button onClick={handleClickAddWish} className="wish-btn">
          {wished && <FaHeart fill="#EEEED0" />}
          {!wished && <IoHeartOutline stroke="#EEEED0" />}
        </button>
        <Button handle={handleClickAddProduct} size="2rem">
          Add to cart
        </Button>
      </section>
    </section>
  );
}
