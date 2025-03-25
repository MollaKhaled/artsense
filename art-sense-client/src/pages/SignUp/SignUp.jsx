import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              phone: data.phone,
            };
            axiosPublic.post("/users", saveUser).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User Created Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              } else {
                // Handle failure to save user in the database
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "User created but failed to save to the database.",
                });
              }
            });
          })
          .catch((error) => {
            // Handle updateUserProfile failure
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update user profile. Please try again.",
            });
          });
      })
      .catch((error) => {
        // Handle createUser failure
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Failed to create user. Please try again.",
        });
      });
  };


  return (
    <>
      <Helmet>
        <title>artsense | Sign Up</title>
      </Helmet>
      <div className='flex justify-center items-center min-h-screen px-4'>
  <div className='flex flex-col w-full max-w-xl p-8 rounded-md bg-gray-100 text-gray-900'>
    <div className='mb-8 text-center'>
      <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
      <p className='text-sm text-gray-400'>Welcome to Artsense</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="*Name"
          name="name"
          className="input input-bordered"
        />
        {errors.name && (
          <span className="text-red-600">Name is required</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder="*Phone"
          name="phone"
          className="input input-bordered"
        />
        {errors.phone && (
          <span className="text-red-600">Phone is required</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="*Email"
          name="email"
          className="input input-bordered"
        />
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 15,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
          })}
          placeholder="*Password"
          name="password"
          className="input input-bordered"
        />
        {errors.password?.type === "required" && (
          <span className="text-red-600">Password is required</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-600">Password must be at least 6 characters</span>
        )}
        {errors.password?.type === "maxLength" && (
          <span className="text-red-600">
            Password must be less than 15 characters
          </span>
        )}
        {errors.password?.type === "pattern" && (
          <span className="text-red-600">
            Password must have one uppercase, one lowercase, one number, and one special character
          </span>
        )}
      </div>
      <div className="form-control mt-6">
        <input
          className="btn w-full"
          type="submit"
          value="Sign Up"
        />
      </div>
    </form>
    <p className="text-center">
      <small>
        Already have an account? <Link to="/login">Please Login</Link>
      </small>
    </p>
    <SocialLogin />
  </div>
</div>



    </>

  );
};

export default SignUp;
