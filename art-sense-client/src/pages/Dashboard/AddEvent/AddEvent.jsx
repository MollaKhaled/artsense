import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddEvent = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // State to track loading
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when the upload starts

    // Validate image and file types
    const image = data.image[0];
    const file = data.file[0];

    if (!image.type.startsWith('image/') || file.type !== 'application/pdf') {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Invalid file type',
        text: 'Please upload a valid image and PDF file.',
        showConfirmButton: true,
      });
      setLoading(false);
      return;
    }

    // Handle image upload to image hosting service
    const imageFormData = new FormData();
    imageFormData.append('image', image);

    try {
      const imageResponse = await fetch(img_hosting_url, {
        method: 'POST',
        body: imageFormData,
      }).then((res) => res.json());

      if (imageResponse.success) {
        const imgURL = imageResponse.data.display_url;

        // Prepare form data for PDF file
        const pdfFormData = new FormData();
        pdfFormData.append('file', file);
        pdfFormData.append('title', data.title);
        pdfFormData.append('press', data.press);
        pdfFormData.append('description', data.description);
        pdfFormData.append('photoUrl', imgURL);

        // Send event data with PDF file to the backend
        const response = await axiosSecure.post('/event', pdfFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.insertedId) {
          reset();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Event added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Failed to add event',
        text: error.message,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false); // Set loading to false after the process completes
    }
  };

  return (
    <>
      <Helmet>
        <title>artsense | Add Event</title>
      </Helmet>
      <div className="w-full p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="form-control w-full mb-4">
              <input
                type="text"
                placeholder="Title"
                {...register('title', { required: true, maxLength: 120 })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full ml-4 mb-4">
              <input
                type="text"
                placeholder="Press Release"
                {...register('press', { required: true, maxLength: 120 })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full mb-4">
            <textarea
              placeholder="Description"
              {...register('description', { required: true, maxLength: 500 })}
              className="textarea textarea-bordered w-full h-36"
            ></textarea>
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Item Image*</span>
            </label>
            <input
              type="file"
              {...register('image', { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Item PDF File*</span>
            </label>
            <input
              type="file"
              {...register('file', { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <button className="btn btn-sm mt-4 font-semibold" type="submit" disabled={loading}>
            {loading ? 'Adding Event...' : 'Add Event'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEvent;
