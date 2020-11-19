import React, { useRef, useState } from 'react';
import { db } from '../../firebase';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { Label, Input } from '../../components/LabelInput';

import AutoTextarea from './AutoTextarea';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router-dom';

export default function RequestModal() {
  const { user } = useUser();
  const { push } = useHistory();
  const [partialData, setPartialData] = useState({
    summary: '',
    date: '',
    cost: '',
    from: '',
    to: '',
  });

  const ordersInputRef = useRef();

  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState('');

  const partialDataHandler = (e) => {
    const { name, value } = e.target;
    setPartialData({ ...partialData, [name]: value });
  };

  const clean = () => {
    setPartialData({
      summary: '',
      date: '',
      cost: '',
      from: '',
      to: '',
    });
    setCurrentOrder('');
    setOrders([]);
  };

  return (
    <Modal
      path="/request"
      title="Request"
      size="py-4 px-6 space-y-0 sm:px-12 sm:py-4"
    >
      {/* there are two forms. one for the entire post, one for the items added.
          Nested forms are forbidden in HTML.
          Each input, label, and button declare which form they belong to using the form attribute.
        */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          db.collection('posts').add({
            ...partialData,
            author: db.collection('customers').doc(user.uid),
            orders,
            orderedAt: new Date(),
            status: 'new',
            pickedAt: null,
            courier: null,
          });
          clean();
          push('/');
        }}
        id="postForm"
      ></form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentOrder !== '' && !orders.includes(currentOrder)) {
            setOrders([...orders, currentOrder]);
            setCurrentOrder('');
          }
          ordersInputRef.current.focus();
        }}
        id="itemsForm"
      ></form>

      <Label form="postForm" htmlFor="summary" title="Give us a summary">
        <AutoTextarea
          required
          className="w-full p-3 border border-gray-500 rounded-sm outline-none focus:border-brand-red"
          onChange={partialDataHandler}
          value={partialData.summary}
          form="postForm"
          name="summary"
          id="summary"
          placeholder="What would I like?"
        />
      </Label>

      <Label form="itemsForm" htmlFor="items" title="Order these items">
        <div className="relative flex items-center">
          <svg
            className="absolute inline ml-4 text-gray-600 fill-current"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM7 11V8H4V7h3V4h1v3h3v1H8v3H7z"
            ></path>
          </svg>
          <input
            ref={ordersInputRef}
            value={currentOrder}
            onChange={(e) => setCurrentOrder(e.target.value)}
            id="items"
            form="itemsForm"
            placeholder="I want..."
            className="w-full py-2 pl-10 pr-12 border border-gray-500 rounded-sm outline-none focus:border-brand-red"
            type="text"
          />
          <button
            className="absolute inset-y-0 right-0 mr-3 font-semibold text-gray-700 focus:outline-none focus:text-brand-red"
            type="submit"
            form="itemsForm"
          >
            Add
          </button>
        </div>
      </Label>

      <ul
        className="overflow-y-scroll text-sm divide-y divide-gray-300"
        style={{ maxHeight: '150px' }}
      >
        {orders.map((item, index) => (
          <li className="flex items-center px-4 py-2 space-x-3" key={index}>
            <button
              onClick={() =>
                setOrders(orders.filter((el) => el !== orders[index]))
              }
            >
              <svg
                className="inline text-red-300 fill-current hover:text-brand-red"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM4 8h7V7H4v1z"
                ></path>
              </svg>
            </button>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex w-full space-x-3">
        <Input
          required={true}
          form="postForm"
          value={partialData.date}
          id="date"
          title="Time"
          placeholder="In an hour"
          handleInputChange={partialDataHandler}
        >
          <svg
            className="absolute inline ml-4 text-gray-600 fill-current"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path d="M9 1H6V0h3v1z" fill="currentColor"></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 2a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 8V5H7v4h3V8H8z"
            ></path>
          </svg>
        </Input>

        <Input
          form="postForm"
          value={partialData.cost}
          required={true}
          id="cost"
          title="Order cost"
          placeholder="20"
          handleInputChange={partialDataHandler}
        >
          <svg
            className="absolute inline ml-4 text-gray-600 fill-current"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.174 5A6.503 6.503 0 0113.78 2.708l-.812.584A5.502 5.502 0 003.207 5H7v1H3.022A5.57 5.57 0 003 6.5v2c0 .169.008.335.022.5H7v1H3.207a5.502 5.502 0 009.761 1.708l.812.584A6.503 6.503 0 012.174 10H0V9h2.019A6.593 6.593 0 012 8.5v-2c0-.168.006-.335.019-.5H0V5h2.174z"
            ></path>
          </svg>
        </Input>
      </div>

      <div className="flex w-full space-x-3">
        <Input
          form="postForm"
          required={true}
          value={partialData.from}
          id="from"
          title="From"
          placeholder="Target near the lake"
          handleInputChange={partialDataHandler}
        >
          <svg
            className="absolute inline ml-4 text-gray-600 fill-current"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path d="M7 7.5a.5.5 0 111 0 .5.5 0 01-1 0z"></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 4a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM3 7.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"
            ></path>
          </svg>
        </Input>

        <Input
          form="postForm"
          value={partialData.to}
          required={true}
          id="to"
          title="To"
          placeholder="My house at..."
          handleInputChange={partialDataHandler}
        >
          <svg
            className="absolute inline ml-4 text-gray-600 fill-current"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.79.093a.5.5 0 00-.58 0l-7 5A.5.5 0 000 5.5v9a.5.5 0 00.5.5H2V8h5v7h7.5a.5.5 0 00.5-.5v-9a.5.5 0 00-.21-.407L14 4.528V2h-1v1.814L7.79.094zM11 12V8h1v4h-1z"
            ></path>
            <path d="M6 15v-3H5v-1h1V9H3v6h3z" fill="currentColor"></path>
          </svg>
        </Input>
      </div>

      <div className="pt-3 space-y-2">
        <Button form="postForm" type="submit">
          Post request
        </Button>
        <Button
          onClick={() => push('/')}
          colors="text-brand-red bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
