import React from 'react';

function Label({ form, htmlFor, title, children }) {
  return (
    <label className="flex-grow py-2 space-y-1" form={form} htmlFor={htmlFor}>
      <span className="block text-sm font-semibold text-gray-800">{title}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  title,
  placeholder,
  id,
  children,
  handleInputChange,
  form,
  required,
}) {
  return (
    <Label form="postForm" htmlFor={id} title={title}>
      <div className="relative flex items-center">
        {children}
        <input
          value={value}
          form={form}
          onChange={handleInputChange}
          id={id}
          name={id}
          required={required}
          className="w-full py-2 pl-10 pr-3 border border-gray-500 rounded-sm outline-none focus:border-brand-red"
          placeholder={placeholder}
          type="text"
        />
      </div>
    </Label>
  );
}

export { Label, Input };
