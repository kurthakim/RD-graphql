import { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // TODO
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        async (result) => {
          const user = result.user;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: { email: user.email, token: idTokenResult.token },
          });

          // send user info to our server mongodb to either update/create
          navigate('/');
        }
      );
    } catch (error) {
      console.log('login error', error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, googleAuthProvider).then(async (result) => {
      const user = result.user;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      });

      // send user info to our server mongodb to either update/create
      navigate('/');
    });
  };
  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
      <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">
        Login with Google
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter password"
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
