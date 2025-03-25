import React from 'react';
import AuctionMenuItem from '../AuctionMenuItem/AuctionMenuItem';


const AuctionMenuCategory = ({items}) => {
  return (
    <div>
     
      <div className='grid md:grid-cols-2 gap-10'>
        {
          items.map(item => <AuctionMenuItem
            key={item._id}
            item={item}
            ></AuctionMenuItem>
          )
        }
      </div>
    </div>
  );
};

export default AuctionMenuCategory;