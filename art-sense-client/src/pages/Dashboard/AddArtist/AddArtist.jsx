import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddArtists = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    const { artist, artistId } = data;
    const newItem = {
      artist,
      artistId,
    };

    axiosSecure.post('/artists', newItem)
      .then(response => {
        if (response.data.insertedId) {
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
  };

  return (
    <>
      <Helmet>
        <title>artsense | Add Artists</title>
      </Helmet>
      <div className='w-full p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist*</span>
              </div>
              <input type="text" placeholder="artist"
                {...register("artist", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist Id*</span>
              </div>
              <input type="text" placeholder="artistId"
                {...register("artistId", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Artist" />
        </form>
      </div>
    </>
  );
};

export default AddArtists;