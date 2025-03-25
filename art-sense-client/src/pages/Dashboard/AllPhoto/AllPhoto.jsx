import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllPhoto = () => {
  const [axiosSecure] = useAxiosSecure();
  
  const { data: photo = [], refetch } = useQuery({
    queryKey: ['photo'],
    queryFn: async () => {
      const res = await axiosSecure.get('/photo');
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/photo/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Deleted Successfully",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    });
  };

  return (
    <div className='w-full'>
      <Helmet>
        <title>artsense | All Artwork Photos</title>
      </Helmet>
      <h3 className='text-3xl font-semibold m-4'>Total Photo: {photo.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {photo.map((photo, index) => (
              <tr key={photo._id}>
                <th>{index + 1}</th>
                <td>
                  <img 
                    src={photo.photoUrl} 
                    alt="photo" 
                    className='w-32 h-32'
                  />
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(photo._id)} 
                    className='btn btn-ghost bg-red-600 text-white'
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPhoto;
