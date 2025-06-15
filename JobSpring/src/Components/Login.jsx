import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.config';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    console.log('Submitted credentials:', email, password);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); 
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/'); 
      }
    } catch (err) {
      console.error('Firebase error:', err.code, err.message);

      const errorMap = {
        'auth/user-not-found': 'User not found. Please sign up.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/email-already-in-use': 'Email is already in use.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/missing-password': 'Please enter a password.',
        'auth/invalid-credential': 'The provided credentials are invalid.',
      };

      setError(errorMap[err.code] || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Signup'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#1a3b9c] bg-blue-700 text-white py-2 rounded"
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
