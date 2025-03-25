import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AllServiceRow = ({inquire, handleDelete}) => {
  const {_id, customerName, email, phone,message} = inquire;
 
  return (
    <tr>
    <td>{customerName}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>{message}</td>
    <td><button onClick={() => handleDelete(_id)} className='btn btn-ghost bg-red-600 text-white'><FaTrashAlt /></button></td>
  </tr>
  );
};

export default AllServiceRow;