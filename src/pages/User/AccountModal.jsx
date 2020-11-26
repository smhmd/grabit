import React, { useState } from 'react';
import { storage, db } from '../../firebase';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { Input } from '../../components/LabelInput';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router-dom';

export default function AccountModal() {
  const { user, setUser, usertype } = useUser();
  const { push } = useHistory();
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [userName, setUserName] = useState('');

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileNameArray = file.name.split('.');
      const fileExtension = fileNameArray[fileNameArray.length - 1];
      const imagePathInStorage = `${
        process.env.NODE_ENV === 'test' ? 'testing/' : ''
      }${user.uid}.${usertype}.${fileExtension}`;
      const fileRef = storage.ref().child(imagePathInStorage);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setPhotoURL(url);
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    const updatedUser = {
      displayName: userName,
      photoURL: photoURL,
    };

    if (userName.trim() === '') {
      updatedUser.displayName = user.displayName;
      if (updatedUser.photoURL === user.photoURL) return;
    }
    try {
      await db
        .collection(usertype)
        .doc(user.uid)
        .set(updatedUser, { merge: true });
      setUser({ ...user, ...updatedUser });
    } catch (e) {
      console.error(e);
    }
    // push('/');
  };

  return (
    <Modal path="/account" title="My Account">
      <form
        className="flex flex-col items-center space-y-3"
        id="accountForm"
        onSubmit={updateAccount}
      >
        <img
          className="object-cover w-24 h-24 border rounded-full"
          src={photoURL}
          alt=""
        />
        <fieldset className="w-full">
          <div className="flex w-full space-x-2">
            <label
              htmlFor="photo"
              className="block w-full px-3 py-2 leading-none text-center text-white bg-gray-500 rounded cursor-pointer"
            >
              Upload
              <input
                accept="image/*"
                className="hidden"
                type="file"
                name="photo"
                id="photo"
                onChange={uploadPhoto}
              />
            </label>
            <button
              onClick={() => {}}
              type="button"
              className="w-full px-3 py-2 leading-none text-gray-500 bg-white border border-gray-500 rounded"
            >
              Remove
            </button>
          </div>
        </fieldset>
        <fieldset className="w-full">
          <Input
            value={userName}
            handleInputChange={(e) => setUserName(e.target.value)}
            title="Update your name"
            placeholder={user.displayName}
            id="name"
            required={false}
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
                d="M7.5 0a3.499 3.499 0 100 6.996A3.499 3.499 0 107.5 0zm-2 8.994a3.5 3.5 0 00-3.5 3.5v2.497h11v-2.497a3.5 3.5 0 00-3.5-3.5h-4z"
                fill="currentColor"
              ></path>
            </svg>
          </Input>
        </fieldset>
        <Button type="submit">Update</Button>
        <Button
          type="button"
          onClick={() => push('/')}
          colors="text-brand-red bg-transparent"
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
}
