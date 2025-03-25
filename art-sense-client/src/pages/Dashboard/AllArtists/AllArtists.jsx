import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';


const AllArtists = () => {
  const [axiosSecure] = useAxiosSecure();
  const { artist } = useContext(AuthContext);
  const { data: artists = [], refetch } = useQuery({ 
    queryKey: ['artists'], 
    queryFn: async () => {
      const res = await axiosSecure.get('/artists');
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
        if(result.isConfirmed)
        axiosSecure.delete(`artists/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Deleted SuccessFully",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
      })
  
    }

  return (
    <div className='w-full'>
      <Helmet>
        <title>artsense | Total Artists</title>
      </Helmet>
      <h3 className='text-3xl font-semibold m-4'>Total Photo:{artists.length}</h3>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-base-200">
        <th>Serial</th>
        <th>Artist</th>
        <th>Artist Id</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
   
    {artists.map((artist, index) => (
  <tr key={artist._id}>
    <th>{index + 1}</th>
    <td>{artist.artist}</td>
    <td>{artist.artistId}</td>
    <td>
      <button onClick={() => handleDelete(artist._id)} className='btn btn-ghost bg-red-600 text-white'>
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

export default AllArtists;