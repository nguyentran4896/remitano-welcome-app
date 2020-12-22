import config from '../config.json';
import {handleResponse} from '../helpers/helpers';

export default {
  getListVideo,
  getVideoCount,
};

function getListVideo(offset, limit) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}` || undefined,
    },
    credentials: 'include',
  };

  console.log(offset);
  console.log(limit);

  return fetch(`${config.baseApi}/movies?offset=${offset}&limit=${limit}`, requestOptions)
      .then(handleResponse)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) =>{
        console.log(err);
        alert(err);
      });
};

function getVideoCount() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}` || undefined,
    },
    credentials: 'include',
  };

  return fetch(`${config.baseApi}/movies-count`, requestOptions)
      .then(handleResponse)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) =>{
        console.log(err);
        alert(err);
      });
};
