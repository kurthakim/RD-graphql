import { useState } from 'react';
import { auth, sendSignInLinkToEmail } from '../../firebase';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    // const result = await sendSignInLinkToEmail(auth, email, config);
    // console.log(
    //   '🚀 ~ file: Register.js ~ line 16 ~ handleSubmit ~ result',
    //   result
    // );
    sendSignInLinkToEmail(auth, email, config)
      .then(() => {
        // show toast notification to user about email sent
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration`
        );

        // save user email to local storage
        window.localStorage.setItem('emailForRegistration', email);

        // clear state
        setEmail('');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Register</h4>
      )}
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
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
