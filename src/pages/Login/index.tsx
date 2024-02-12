import './login.css';
import { Input } from '../../components/common/input';
import { Button } from '../../components/common/button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext } from '../../components/layouts/AuthContext';
import {
  getUsers,
  resetForm,
  resetInput,
  setErrorInput,
  setSuccessInput,
} from '../../utils';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userAuth = useAuthContext();
  const navigate = useNavigate();

  // useEffect(() => validateMail(), [email]);

  async function validateForm(e: FormEvent): Promise<void> {
    e.preventDefault();
    const users = await getUsers();
    let userFound = users.find((user) => email === user.email);

    if (userFound && password === userFound.password) {
      userAuth.setUser(userFound);
      resetForm([e.target.email, e.target.password]);
      navigate('/home');
    } else {
      setErrorInput(e.target.password);
      setPasswordError('Incorrect password');
    }
  }

  async function validateMail(e: ChangeEvent) {
    const emailInput = e.target;
    setEmail(emailInput.value.trim());
    const users = await getUsers();
    let userFound = users.find(
      (user) => emailInput.value.trim() === user.email
    );

    if (emailInput.value.trim() === '') {
      resetInput(emailInput);
    } else if (!userFound) {
      setErrorInput(emailInput);
      setEmailError('Email not registered');
    } else {
      setSuccessInput(emailInput);
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
            name="email"
            type="text"
            text="email"
            img="/resources/mail.svg"
            handleChange={validateMail}
            error={emailError}
          />
          <Input
            name="password"
            type="password"
            text="password"
            img="/resources/lock.svg"
            handleChange={(e: ChangeEvent) => setPassword(e.target.value)}
            error={passwordError}
          />
          <a href="#" title="Forgot your password">
            Forgot your password?
          </a>
          <Button text="Log in" />
          <p>
            Not registered yet?{' '}
            <a href="#" title="Create an account">
              Create an account
            </a>
          </p>
        </form>
      </section>
    </section>
  );
}
