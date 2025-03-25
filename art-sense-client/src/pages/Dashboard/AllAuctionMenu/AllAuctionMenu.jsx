import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import AllAuctionMenuRow from './AllAuctionMenuRow';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllAuctionMenu = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: auctions = [], refetch } = useQuery({
    queryKey: ['auctions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/auction');
      return res.data;
    },
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
        axiosSecure.delete(`auction/${id}`)
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
    <>
      <Helmet>
        <title>artsense | All Auction Menu</title>
      </Helmet>
      <div>
        <h2>All Auction Menu:{auctions.length}</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full ">
            {/* head */}
            <thead className='bg-gray-500 text-white'>
              <tr>
            
                <th>Photo</th>
                <th>LotID</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                auctions.map(auction => <AllAuctionMenuRow
                  key={auction._id}
                  auction={auction}
                  handleDelete={handleDelete}
                ></AllAuctionMenuRow>)
              }

            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};

export default AllAuctionMenu;