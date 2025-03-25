import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';




const Login = () => {

  const { signIn, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);
  let from = location.state?.from?.pathname || '/';

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
    console.log(email, password);
  
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
  
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error("Login error:", error);
  
        // Show error message
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid email or password",
          // text: error.message, // Optional: include detailed error messages
          showConfirmButton: true,
        });
      });
  };
  
  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide an email!',
      });
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please provide a valid email address!',
      });
      return;
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Email Sent',
          text: `A password reset email has been sent to ${email}. Please check your inbox.`,
        });
      })
      .catch((error) => {
        console.error('Error resetting password:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
  };



  return (
    <>
    <Helmet>
      <title>artsense | Login</title>
    </Helmet>
    <div className='flex justify-center items-center min-h-screen px-4'>
  <div className='flex flex-col w-full max-w-xl p-8 rounded-md bg-gray-100 text-gray-900'>
    <div className='mb-8 text-center'>
      <h1 className='my-3 text-4xl font-bold'>Login</h1>
      <p className='text-sm text-gray-400'>Welcome to Artsense</p>
    </div>
          <form onSubmit={handleLogin} className="card-body p-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="*Email"
                ref={emailRef}
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="*Password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn w-full"
                type="submit"
                value="Login"
              ></input>
            </div>
          </form>
          <p className="text-center">
            <small>
              New here? <Link to="/signup">Create an account</Link>
            </small>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    
  </>
  
  );
};

export default Login;