import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser, googleLogin, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full"
              required
            />
            <p className="text-xs text-right mt-1 text-gray-500">
              Forget Password ?
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full"
            disabled={loading}
          >
            <FcGoogle size={20} />
            <p>Continue with Google</p>
          </button>
        </div>

        <p className="text-center text-sm mt-3">
          New here?
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
