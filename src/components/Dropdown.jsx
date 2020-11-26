import React from 'react';

export default function Dropdown({
  children,
  className,
  isDropdownOpen,
  setDropdownOpen,
  position,
}) {
  return (
    <div className={`relative ${className}`}>
      <button
        data-testid="dropdown-button"
        className="block "
        onClick={() => setDropdownOpen(true)}
      >
        {children[0]}
      </button>
      {isDropdownOpen && (
        <>
          <button
            data-testid="dropdown-overlay-button"
            tabIndex="-1"
            className="fixed inset-0 w-full h-full cursor-default focus:outline-none"
            onClick={() => setDropdownOpen(false)}
          ></button>

          <div
            data-testid="dropdown-content"
            className={`absolute z-10 right-0 w-40 py-2 bg-white border rounded shadow-lg ${
              position || 'mt-2'
            }`}
          >
            {children[1]}
          </div>
        </>
      )}
    </div>
  );
}
