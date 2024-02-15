import './login.css';
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Types, ActionForm } from '../../utils/interfaces/form';
import { Input } from '../../components/common/input';
import { Button } from '../../components/common/button';
import { useAuthContext } from '../../components/layouts/AuthContext';
import { getUsers, resetForm, setErrorInput } from '../../utils';
import { User } from '../../utils/interfaces/user';

const initialState: Form = {
  username: '',
  password: '',
};

function reducer(state: Form, action: ActionForm): Form {
  switch (action.type) {
    case Types.ChangeEmail: {
      return {
        ...state,
        username: action.value as string,
      };
    }
    case Types.ChangePassword: {
      return {
        ...state,
        password: action.value as string,
      };
    }
    case Types.Reset: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState([] as User[]);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userAuth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function setUsersAPI() {
      const response = await getUsers();
      setUsers(response);
    }

    setUsersAPI();
  }, []);

  async function validateForm(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    let userFound = users.find((user) => state.username === user.username);

    resetForm([e.target.username, e.target.password]);

    if (!userFound) {
      setErrorInput(e.target.username);
      setUsernameError('Email not registered');
    } else if (state.password !== userFound.password) {
      setErrorInput(e.target.password);
      setPasswordError('Incorrect password');
    } else {
      dispatch({ type: Types.Reset });
      userAuth.setUser(userFound);
      navigate('/home');
    }
  }

  return (
    <section className="login">
      <section className="login-header">
        <h1>
          Book<span>pedia</span>
        </h1>
        <img src="/resources/login-img.png" alt="Login image" />
      </section>
      <section className="login-account">
        <div>
          <h2>Welcome</h2>
          <p>Enter your account here</p>
        </div>
        <form onSubmit={validateForm}>
          <Input
            name="username"
            type="text"
            text="username"
            img="/resources/mail.svg"
            value={state.username}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Types.ChangeEmail, value: e.target.value });
            }}
            // handleChange={validateMail}
            error={usernameError}
          />
          <Input
            name="password"
            type="password"
            text="password"
            img="/resources/lock.svg"
            value={state.password}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: Types.ChangePassword, value: e.target.value })
            }
            error={passwordError}
          />
          <a href="#" title="Forgot your password">
            <span>Forgot your password?</span>
          </a>
          <Button> Log in </Button>
          <p>
            Not registered yet?{' '}
            <a href="#" title="Create an account">
              <span>Create an account</span>
            </a>
          </p>
        </form>
      </section>
    </section>
  );
}
