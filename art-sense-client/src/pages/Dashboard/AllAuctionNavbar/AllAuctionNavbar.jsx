import { useQuery } from '@tanstack/react-query';

import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import { FaTrash, FaUserShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const AllAuctionNavbar = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {data: users =[], refetch} = useQuery({ queryKey: ['users'], queryFn: async () => {
      const res = await axiosSecure.get('/AuctionNavbar');
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
         axiosSecure.delete(`auctionNavbar/${id}`)
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
        <title>artsense | All Auction Navbar</title>
      </Helmet>
      <h3 className='text-3xl font-semibold m-4'>Total Photo:{users.length}</h3>
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
   
   {
      users.map((user, index) => <tr
      key={user._id}
      >
        <th>{index + 1}</th>
        <td>
          <img src={user.photoUrl} alt="" />
        </td>
        <td><button onClick={() => handleDelete(user._id)} className='btn btn-ghost bg-red-600 text-white'><FaTrashAlt /></button></td>
      </tr>)
     }

    </tbody>
  </table>
</div>
    </div>
  );
};

export default AllAuctionNavbar;