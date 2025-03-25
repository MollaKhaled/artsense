import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TotalPhoto = () => {
  const [axiosSecure] = useAxiosSecure();

  // Fetch photos
  const { data: photos = [], isLoading, error, refetch } = useQuery({
    queryKey: ['totalPhoto'],
    queryFn: async () => {
      const res = await axiosSecure.get('/totalPhoto');
      console.log(res.data) 
      return res.data;
    },
  });

  // Delete handler
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
        axiosSecure.delete(`/totalPhoto/${id}`)
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
          })
          .catch(error => {
            console.error("Error deleting photo:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while deleting!",
            });
          });
      }
    });
  };

  return (
    <div className='w-full'>
      <Helmet>
        <title>artsense | All Artwork Photos</title>
      </Helmet>

      {/* Show loading state */}
      {isLoading && <p className="text-center text-lg font-semibold">Loading photos...</p>}

      {/* Show error if API fails */}
      {error && <p className="text-center text-red-600">Error loading photos.</p>}

      <h3 className='text-3xl font-semibold m-4'>Total Photos: {photos.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo, index) => (
              <tr key={photo._id}>
                <th>{index + 1}</th>
                <td>
                  <img 
                    src={photo.photoUrl || 'https://via.placeholder.com/150'} 
                    alt="Photo" 
                    className='w-32 h-32 object-cover'
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
            {photos.length === 0 && !isLoading && <tr><td colSpan="3" className="text-center">No photos found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalPhoto;
