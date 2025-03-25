import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

const Services = () => {
  const { id } = useParams();
  const [cart, refetch] = useCart();

  const handleService = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    const service = {
      customerName: name,
      email,
      phone,
      message,
    };

    console.log(service);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/service`, {

      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Inquiry submitted successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          refetch();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to submit inquiry",
            text: "Please try again later.",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting inquiry:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>artsense | services</title>
      </Helmet>
      <div className="flex flex-wrap md:flex-nowrap gap-6 mt-8 items-start text-sm">
  {/* Services Section */}
  <div className="text-center md:text-right w-full md:w-1/2 mb-4">
    <h1 className="text-lg">
      <span className="text-red-600"></span>serv
      <span className="text-red-600">i</span>ces
    </h1>
    <p>selling<span className="text-red-600"> | </span>commissioning</p>
    <p>authenticating<span className="text-red-600"> | </span>cataloguing</p>
    <p>framing<span className="text-red-600"> | </span>packaging</p>
    <p>restoration by expert </p>
    <p>worldwide courier service</p>
  </div>

  {/* Contact Section */}
  <div className="w-full md:w-1/2 lg:mt-40">
    <h1 className="text-lg text-center md:text-left">
      <span className="text-red-600"></span>con
      <span className="text-red-600">t</span>act us
    </h1>
    <div>
      <h1>
        <p className="text-center md:text-left">
          <span className="text-red-600">a</span>rt
          <span className="text-red-600">s</span>ense
          <span className="text-red-600"> | </span>House 29, Road 13, Baridhara, Dhaka 1212 <br />
          +880 1718 876332<span className="text-red-600"> | </span>artsensebdgallery@gmail.com
        </p>
      </h1>
    </div>
          <div>
            <div className="flex items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <form onSubmit={handleService} className="card-body p-6 sm:p-8 md:p-10">
                  <div className="gap-6">
                    {/* Form Fields */}
                    <div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600">Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="*Name"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600">Phone</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="*Phone"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600">Email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="*Email"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      
                      <div className="form-control h-full">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600">Message</span>
                        </label>
                        <textarea
                          name="message"
                          placeholder="*Message"
                          className="textarea textarea-bordered h-full resize-none"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <input className="btn" type="submit" value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[400px] mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3135560562105!2d90.41363118577416!3d23.807446631502184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7003e367ad7%3A0xf14a9a69f2e94245!2sartsense!5e0!3m2!1sen!2sus!4v1733578505882!5m2!1sen!2sus"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Services;