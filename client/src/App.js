import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
