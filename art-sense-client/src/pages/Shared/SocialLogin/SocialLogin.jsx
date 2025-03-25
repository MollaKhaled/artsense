import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const {googleSignIn}= useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
      googleSignIn()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const saveUser ={ name:loggedUser.displayName, email:loggedUser.email }
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          method:"POST",
          headers: {
            'Content-type' : 'application/json'
          },
          body:JSON.stringify(saveUser)
        }) 
        .then(res => res.json())
        .then(() => {
            navigate(from, {replace:true});
        })
      })
  }

  return (
    <div>
      <div className='divider'></div>
      <div className='w-fll text-center my-4'>
        <button onClick={handleGoogleSignIn} >
        <FcGoogle className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;