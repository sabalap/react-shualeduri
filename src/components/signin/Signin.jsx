import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { login } from '../../services/auth';

function Signin() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        const loggedIn = await login(data);
        // console.log(loggedIn);
        localStorage.setItem('token', JSON.stringify(loggedIn.token));
        history.replace('/');
    };

    return (
        <div className="col-6 m-auto">
            <h4 className="text-muted">Sign In From</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
          </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        defaultValue="eve.holt@reqres.in"
                        {...register('email', { required: true, email: true })}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
          </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
          </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        defaultValue="cityslicka"
                        {...register('password', { required: true })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
        </button>
            </form>
        </div>
    );
}

export default Signin;