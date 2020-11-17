import React from 'react';
import LogoSVG from '../assets/logo-dark.svg';

export default function LoadingScreen() {
  return (
    <div className="inset-0 grid h-screen place-items-center">
      <img className="" src={LogoSVG} alt="" />
    </div>
  );
}
