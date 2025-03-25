import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { formatCurrency } from '../../../utils/currencyFormatter';



const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddExhibition = () => {
  const [axiosSecure] = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
  
    fetch(img_hosting_url, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(imgResponse => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { artist, title, media, size, year, price, stockCode, artistId } = data;
  
          // Only format the price if it's a valid number
          const formattedPrice = price ? formatCurrency(parseFloat(price)) : null;
  
          const newItem = {
            artistId,
            artist,
            title,
            media,
            size,
            year: parseFloat(year),
            stockCode,
            photoUrl: imgURL,
          };
  
          // Add the price only if it exists
          if (price) {
            newItem.price = parseFloat(price); // Store the raw price as a number
            newItem.formattedPrice = formattedPrice; // Store the formatted price
          }
  
          console.log(newItem);
  
          axiosSecure.post('/TotalPhoto', newItem)
            .then(data => {
              console.log('After posting photo item', data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Total Photo Item added successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  

  return (
    <>
      <Helmet>
        <title>artsense | Add Total Photo</title>
      </Helmet>
      <div className='w-full p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist id*</span>
              </div>
              <input type="text" placeholder="Artist id"
                {...register("artistId", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist*</span>
              </div>
              <input type="text" placeholder="artist"
                {...register("artist", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Title*</span>
              </div>
              <input type="text" placeholder="title"
                {...register("title", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Media*</span>
              </div>
              <input type="text" placeholder="media"
                {...register("media", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Size*</span>
              </div>
              <input type="text" placeholder="size"
                {...register("size", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
          
            <div className="form-control w-full  mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Year*</span>
              </div>
              <input type="text" placeholder="year"
                {...register("year", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4  mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Price*</span>
              </div>
              <input type="number" placeholder="Price"
                {...register("price", { maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className="form-control w-full mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">StockCode*</span>
            </div>
            <input type="text" placeholder="stockCode"
              {...register("stockCode", { required: true, maxLength: 120 })}
              className="input input-bordered w-full " />
          </div>
          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold mb-4 ">Item Image*</span>
            </div>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
          </div>
          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Item" />
        </form>
      </div>
    </>
  );
};

export default AddExhibition;