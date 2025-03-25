import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import AllInquireRow from './AllInquireRow';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const AllInquire = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user:inquire } = useContext(AuthContext);
  const {data: inquires =[], refetch} = useQuery({ queryKey: ['inquires'], queryFn: async () => {
      const res = await axiosSecure.get('/inquire');
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
         axiosSecure.delete(`inquire/${id}`)
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
  <>
  <Helmet>
        <title>artsense | AllInquire</title>
      </Helmet>
    <div>
      <h2>all inquire:{inquires.length}</h2>
      <div className="overflow-x-auto w-full">
  <table className="table w-full ">
    {/* head */}
    <thead className='bg-gray-500'>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>phone</th>
        <th>address</th>
        <th>comments</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
          inquires.map(inquire =><AllInquireRow
          key={inquire._id}
          inquire={inquire}
          handleDelete={handleDelete}
          ></AllInquireRow>)
        }
     
    </tbody>
   
  </table>
</div>
    </div>
  </>
  );
};

export default AllInquire;