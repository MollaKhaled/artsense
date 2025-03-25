import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";

const Inquire = () => {
  const { id, lotId } = useParams();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate(); // Add navigate for redirection

  const handleBookService = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const email = user?.email;
    const phone = form.phone.value;
    const address = form.address.value;
    const comments = form.comments.value;

    const inquire = {
      artId: id, // Using id from useParams
      lotId,
      customerName: name,
      email,
      phone,
      address,
      comments,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/inquire`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inquire),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Inquiry Submitted Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          refetch();
        } else {
          Swal.fire({
            title: "You are not Logged In",
            text: "Please login to inquire!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>artsense | Inquire</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleBookService} className="card-body p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="form-control mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="* Name"
                    className="input input-bordered"
                    required
                  />
                </div>
              
                <div className="form-control mb-4">
                  <input
                    type="text"
                    name="phone"
                    placeholder="* Phone"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="* Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <textarea
                    name="address"
                    placeholder="* Address"
                    className="textarea textarea-bordered h-28 resize-none"
                    required
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="form-control h-full">
                  <textarea
                    name="comments"
                    placeholder="* Comments"
                    className="textarea textarea-bordered h-full resize-none"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <input className="btn " type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inquire;
