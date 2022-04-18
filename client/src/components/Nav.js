import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../context/authContext';
import { signOut } from 'firebase/auth';

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = state;

  const logout = async () => {
    await signOut(auth);
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: null,
    });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Brand
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <a href="/login" className="nav-item nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            )}
          </ul>

          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <Link className="nav-link" to="#">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <Link className="nav-link" to="#">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
          </ul>

          <form className="w-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
