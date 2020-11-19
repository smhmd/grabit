import React from 'react';
import { NavLink } from 'react-router-dom';
import standingSVG from '../../assets/illustrations/building.svg';
import Button from '../../components/Button';

function Navbar() {
  return (
    <nav className="flex flex-col justify-between h-full text-black sm:pt-5">
      <div className="flex w-full text-black text-opacity-75 sm:block">
        <NavLink
          className="flex-grow block px-6 py-5 text-sm font-semibold text-center capitalize sm:text-left hover:bg-brand-red hover:text-white"
          activeClassName="text-white bg-brand-red"
          exact
          to="/"
        >
          <svg
            className="inline mr-2"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M10.5.5l.277-.416L10.651 0H10.5v.5zm3 2h.5v-.268l-.223-.148-.277.416zm-1 9.5h-8v1h8v-1zM4 11.5v-10H3v10h1zM4.5 1h6V0h-6v1zM13 2.5v9h1v-9h-1zM10.223.916l3 2 .554-.832-3-2-.554.832zM4.5 12a.5.5 0 01-.5-.5H3A1.5 1.5 0 004.5 13v-1zm8 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM4 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 003 1.5h1zm-3 2v10h1v-10H1zM2.5 15h8v-1h-8v1zm0-12h1V2h-1v1zM12 13.5v-1h-1v1h1zM10.5 15a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM1 13.5A1.5 1.5 0 002.5 15v-1a.5.5 0 01-.5-.5H1zm1-10a.5.5 0 01.5-.5V2A1.5 1.5 0 001 3.5h1z"
              fill="currentColor"
            ></path>
          </svg>
          My requests
        </NavLink>
        <NavLink
          className="flex-grow block px-6 py-5 text-sm font-semibold text-center capitalize sm:text-left hover:bg-brand-red hover:text-white"
          activeClassName="text-white bg-brand-red"
          to="/history"
        >
          <svg
            className="inline mr-2"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M2.5 12.399l.37-.336-.006-.007-.007-.007-.357.35zm1 1.101v.5H4v-.5h-.5zm3.5.982l.018-.5-.053 1 .035-.5zM7.5 7.5H7a.5.5 0 00.146.354L7.5 7.5zm6.5 0A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM2.857 12.049A6.477 6.477 0 011 7.5H0c0 2.043.818 3.897 2.143 5.249l.714-.7zm-.727.686l1 1.101.74-.672-1-1.101-.74.672zM7.5 14a6.62 6.62 0 01-.465-.016l-.07.997c.177.013.355.019.535.019v-1zm.018 0l-.5-.017-.036 1 .5.017.036-1zM7 3v4.5h1V3H7zm.146 4.854l3 3 .708-.708-3-3-.708.708zM0 14h3.5v-1H0v1zm4-.5V10H3v3.5h1z"
              fill="currentColor"
            ></path>
          </svg>
          My History
        </NavLink>
      </div>
      <div className="self-center hidden px-2 pb-10 space-y-2 text-xs text-center text-black sm:block">
        <img
          src={standingSVG}
          alt="illustration of a courier standing"
          className="block w-full px-3"
        />
        <div>Want to deliver goods all over the world?</div>
        <Button>Go Premium</Button>
      </div>
    </nav>
  );
}

export default Navbar;
