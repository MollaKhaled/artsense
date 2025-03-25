import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const onSubmit = data => {

    const formData = new FormData();
    formData.append('image', data.image[0])

    fetch(img_hosting_url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgResponse => {
        if (imgResponse.success) { // Correct variable: `imgResponse`
          const imgURL = imgResponse.data.display_url;
          const { artist, title, media, size, year, price, lotId,artistId,artworkDetails,
            condition, history,shipping,payment, } = data;
          const newItem = {
            artistId,artist, title, media, size,
            year: parseFloat(year),
            price: parseFloat(price),
            lotId, photoUrl: imgURL,
            artworkDetails,
            condition, history,shipping,payment,
          };
          console.log(newItem);
          axiosSecure.post('/photo', newItem)
            .then(data => {
              console.log('After posting photo item', data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Item added successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });
        }
      });


  };

  return (
    <>
      <Helmet>
        <title>artsense | Add Item</title>
      </Helmet>
      <div className='w-full p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist Id*</span>
              </div>
              <input type="text" placeholder="Artist Id"
                {...register("artistId", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
           
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist*</span>
              </div>
              <input type="text" placeholder="Artist"
                {...register("artist", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Title*</span>
              </div>
              <input type="text" placeholder="Title"
                {...register("title", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Media*</span>
              </div>
              <input type="text" placeholder="Media"
                {...register("media", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Size*</span>
              </div>
              <input type="text" placeholder="Size"
                {...register("size", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Year*</span>
              </div>
              <input type="number" placeholder="Year"
                {...register("year", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Price*</span>
              </div>
              <input type="number" placeholder="Price"
                {...register("price", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className="form-control w-full mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Artwork Id*</span>
            </div>
            <input type="text" placeholder="Artwork Id"
              {...register("lotId", { required: true, maxLength: 120 })}
              className="input input-bordered w-full " />
          </div>
          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold mb-4 ">Item Image*</span>
            </div>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
          </div>
          <div className="form-control w-full  mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Condition Report*</span>
            </div>
            <textarea type="text" placeholder="Condition Report"
              {...register("condition", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered h-28 " />
          </div>
          <div className="form-control w-full  mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">History and Provenance*</span>
            </div>
            <textarea type="text" placeholder="History and Provenance"
              {...register("history", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered h-28 " />
          </div>
          <div className="form-control w-full  mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Shipping Information*</span>
            </div>
            <textarea type="text" placeholder="Shipping Information"
              {...register("shipping", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered h-28 " />
          </div>
          <div className="form-control w-full  mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Payment and Return Policies*</span>
            </div>
            <textarea type="text" placeholder="Payment and Return Policies"
              {...register("payment", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered h-28 " />
          </div>
          <div className="form-control w-full  mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Artwork Details*</span>
            </div>
            <textarea type="text" placeholder="Artwork Details"
              {...register("artworkDetails", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered h-32 " />
          </div>
          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Item" />
        </form>
      </div>
    </>
  );
};

export default AddItem;