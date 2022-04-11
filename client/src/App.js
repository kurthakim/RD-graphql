import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import Login from './pages/auth/Login';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/complete-registration"
          element={<CompleteRegistration />}
        />
      </Routes>
    </>
  );
};

export default App;
