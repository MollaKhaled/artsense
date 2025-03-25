import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import AllServiceRow from './AllServiceRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AllServices = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user:service } = useContext(AuthContext);
  const {data: services =[], refetch} = useQuery({ queryKey: ['services'], queryFn: async () => {
      const res = await axiosSecure.get('/service');
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
         axiosSecure.delete(`service/${id}`)
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
        <title>artsense | AllServices</title>
      </Helmet>
    <div>
      <h2>all Services:{services.length}</h2>
      <div className="overflow-x-auto w-full">
  <table className="table w-full ">
    {/* head */}
    <thead className='bg-gray-500'>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>phone</th>
        <th>Message</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
          services.map(inquire =><AllServiceRow
          key={inquire._id}
          inquire={inquire}
          handleDelete={handleDelete}
          ></AllServiceRow>)
        }
     
    </tbody>
   
  </table>
</div>
    </div>
  </>
  );
};

export default AllServices;