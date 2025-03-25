import React from 'react';
import useAuctionMenu from '../../../hooks/useAuctionMenu';
import AuctionMenuCategory from './AuctionMenuCategory/AuctionMenuCategory';
import { Helmet } from 'react-helmet-async';

const AuctionMenu = () => {
  const[auctionMenu] = useAuctionMenu();
  const auctionA = auctionMenu.filter(item =>item.auctionCategory === 'ASA1');
  const auctionB = auctionMenu.filter(item =>item.auctionCategory === 'ASA2');
  const auctionC = auctionMenu.filter(item =>item.auctionCategory === 'ASA3');
  const auctionD = auctionMenu.filter(item =>item.auctionCategory === 'ASA4');
  const auctionE = auctionMenu.filter(item =>item.auctionCategory === 'ASA5');
  const auctionF = auctionMenu.filter(item =>item.auctionCategory === 'ASA6');
  const auctionG = auctionMenu.filter(item =>item.auctionCategory === 'ASA7');
  const auctionH = auctionMenu.filter(item =>item.auctionCategory === 'ASA8');
  const auctionI = auctionMenu.filter(item =>item.auctionCategory === 'ASA9');
  const auctionJ = auctionMenu.filter(item =>item.auctionCategory === 'ASA10');
  const auctionK = auctionMenu.filter(item =>item.auctionCategory === 'ASA11');
  const auctionL = auctionMenu.filter(item =>item.auctionCategory === 'ASA12');
  const auctionM = auctionMenu.filter(item =>item.auctionCategory === 'ASA13');
  const auctionN = auctionMenu.filter(item =>item.auctionCategory === 'ASA14');
  const auctionO = auctionMenu.filter(item =>item.auctionCategory === 'ASA15');
  const auctionP = auctionMenu.filter(item =>item.auctionCategory === 'ASA16');
  const auctionQ = auctionMenu.filter(item =>item.auctionCategory === 'ASA17');
  const auctionR = auctionMenu.filter(item =>item.auctionCategory === 'ASA18');
  const auctionS = auctionMenu.filter(item =>item.auctionCategory === 'ASA19');
  const auctionT = auctionMenu.filter(item =>item.auctionCategory === 'ASA20');
  const auctionU = auctionMenu.filter(item =>item.auctionCategory === 'ASA21');
  const auctionV = auctionMenu.filter(item =>item.auctionCategory === 'ASA22');
  const auctionW = auctionMenu.filter(item =>item.auctionCategory === 'ASA23');
  const auctionX = auctionMenu.filter(item =>item.auctionCategory === 'ASA24');
  const auctionY = auctionMenu.filter(item =>item.auctionCategory === 'ASA25');
  const auctionZ = auctionMenu.filter(item =>item.auctionCategory === 'ASA26');
  return (
    <>
    <Helmet>artsense | Auction Menu</Helmet>
    <div className='gap-4'>
      <h1 className='text-center font-bold'>AuctionA</h1>
      <AuctionMenuCategory items={auctionA}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionB</h1>
      <AuctionMenuCategory items={auctionB}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionC</h1>
      <AuctionMenuCategory items={auctionC}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionD</h1>
      <AuctionMenuCategory items={auctionD}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionE</h1>
      <AuctionMenuCategory items={auctionE}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionF</h1>
      <AuctionMenuCategory items={auctionF}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionG</h1>
      <AuctionMenuCategory items={auctionG}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionH</h1>
      <AuctionMenuCategory items={auctionH}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionI</h1>
      <AuctionMenuCategory items={auctionI}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionJ</h1>
      <AuctionMenuCategory items={auctionJ}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionK</h1>
      <AuctionMenuCategory items={auctionK}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionL</h1>
      <AuctionMenuCategory items={auctionL}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionM</h1>
      <AuctionMenuCategory items={auctionM}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionN</h1>
      <AuctionMenuCategory items={auctionN}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionO</h1>
      <AuctionMenuCategory items={auctionO}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionP</h1>
      <AuctionMenuCategory items={auctionP}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionQ</h1>
      <AuctionMenuCategory items={auctionQ}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionR</h1>
      <AuctionMenuCategory items={auctionR}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionS</h1>
      <AuctionMenuCategory items={auctionS}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionT</h1>
      <AuctionMenuCategory items={auctionT}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionU</h1>
      <AuctionMenuCategory items={auctionU}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionV</h1>
      <AuctionMenuCategory items={auctionV}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionW</h1>
      <AuctionMenuCategory items={auctionW}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionX</h1>
      <AuctionMenuCategory items={auctionX}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionY</h1>
      <AuctionMenuCategory items={auctionY}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionZ</h1>
      <AuctionMenuCategory items={auctionZ}></AuctionMenuCategory>
      
    </div>
    </>
  );
};

export default AuctionMenu;