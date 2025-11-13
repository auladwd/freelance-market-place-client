import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = password => {
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password))
      return 'Password must contain an uppercase letter.';
    if (!/[a-z]/.test(password))
      return 'Password must contain a lowercase letter.';
    return null;
  };

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photoURL"
              type="url"
              className="input input-bordered w-full"
              placeholder="https://"
            />
          </div>

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
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4">
          <button onClick={handleGoogle} className="btn btn-outline w-full">
            <FcGoogle size={20} />
            <p>Continue with Google</p>
          </button>
        </div>

        <p className="text-center text-sm mt-3">
          Already have an account?{' '}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
