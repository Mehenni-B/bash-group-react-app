import React from "react";

const TrashSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="none"
      viewBox="0 0 35 35"
    >
      <path
        stroke="#DC0000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.656 7.656l1.367 21.875c.065 1.264.985 2.188 2.188 2.188h12.578c1.208 0 2.11-.924 2.188-2.188l1.367-21.875"
      ></path>
      <path fill="#DC0000" d="M5.469 7.656H29.53z"></path>
      <path
        stroke="#DC0000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M5.469 7.656H29.53"
      ></path>
      <path
        stroke="#DC0000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.125 7.656V4.922a1.637 1.637 0 011.64-1.64h5.47a1.636 1.636 0 011.64 1.64v2.734M17.5 12.031v15.313M12.578 12.03l.547 15.313m9.297-15.313l-.547 15.313"
      ></path>
    </svg>
  );
};

export default TrashSVG;
