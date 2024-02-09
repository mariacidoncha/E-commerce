import './login.css';
import { Input } from '../../components/common/input';
import { Button } from '../../components/common/button';

export function Login () {
  return (
    <section className='login'>
        <section className='login-header'>
            <h1>Book<span>pedia</span></h1>
            <img src="/resources/login-img.png" alt="Login image" />
        </section>
        <section className='login-account'>
            <div>
                <h2>Welcome</h2>
                <p>Enter your account here</p>
            </div>
            <form>
                <Input type='text' text='email' img='/resources/mail.svg'/>
                <Input type='password' text='password' img='/resources/lock.svg'/>
                <a href="#" title='Forgot your password'>Forgot your password?</a>
                <Button text='Log in'/>
                <small>Not registered yet? <a href="#" title='Create an account'>Create an account</a></small>
            </form>
        </section>
    </section>
  );
}
