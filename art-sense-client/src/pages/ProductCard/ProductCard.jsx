import React from "react";
import {  useParams } from "react-router-dom";


const ProductCard = () => {
  const {  id } = useParams();
  const phoneNumber = "+8801727079377"; // Replace with your WhatsApp number
  const fixedMessage = "";
  const productMessage = `${fixedMessage} id ${id }`;

  const handleInquireClick = () => {
    const encodedMessage = encodeURIComponent(productMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div>

    </div>
  );
};

export default ProductCard;