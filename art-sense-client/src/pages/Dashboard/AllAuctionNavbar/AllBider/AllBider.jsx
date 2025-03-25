import { useQuery } from '@tanstack/react-query';

import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllBider = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: bid = [], refetch } = useQuery({
    queryKey: ['bid'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bid');
      return res.data;
    },
  });
  
  // Sort the bid array by lotId in ascending order
  const sortedBid = [...bid].sort((a, b) => a.lotId - b.lotId);
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
        axiosSecure.delete(`bid/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-center",
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
    <div className="w-full">
      <Helmet>
        <title>artsense | All Bidder</title>
      </Helmet>
      <h3 className="text-3xl font-semibold m-4">Total Bider: {bid.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Lot ID</th>
              <th>Price</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedBid.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.lotId}</td>
                <td className="font-bold">{user.bidAmount}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost bg-red-600 text-white"
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

export default AllBider;
