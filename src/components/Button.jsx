/*
  This component renders a button that provides default colors and size,
  but can take `colors` and `size` props to override those. 
  it also takes all outside props in and renders `props.children` inside.
 */

import React from 'react';

function Button(props) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center font-semibold rounded disabled:bg-black disabled:bg-opacity-25 disabled:cursor-not-allowed
      ${props.colors || 'text-white bg-brand-red'}
      ${props.size || 'w-full px-6 py-2 md:px-12 md:py-3'}
      `}
    >
      {props.children}
    </button>
  );
}

export default Button;
