import {useEffect, useState} from 'react';
import {apiUrl} from '../utils/app-config';
import {doFetch} from '../utils/functions';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      //console.log(json);
      const json = await doFetch(apiUrl + 'media');
      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + 'media/' + item.file_id);
          //console.log('fileData', fileData);
          return fileData;
        }),
      );
      //console.log(data);
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error('loadMedia failed', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray};
};
const useAuthentication = () => {
  const postLogin = async (user) => {
    console.log(user);
    try {
      return await doFetch(apiUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error('postLogin error', error);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      return await doFetch(apiUrl + 'users/user', options);
  };
  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    };
    return await doFetch(apiUrl + 'users', options);
  };
  return {getUserByToken,postUser};
 };

export {useMedia, useAuthentication, useUser};
