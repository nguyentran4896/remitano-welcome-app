import {toast} from 'react-toastify';

import config from '../config.json';
import helpers from '../helpers/helpers';

const TOAST_DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export default function share(url) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}` || undefined,
    },
    body: JSON.stringify({url}),
    credentials: 'include',
  };

  return fetch(`${config.baseApi}/movies`, requestOptions)
      .then(helpers.handleResponse)
      .then((data) => {
        toast.success(`Successfully sharing this video!`);
        return data;
      })
      .catch((err) =>{
        toast.error(err, TOAST_DEFAULT_OPTIONS);
        return null;
      });
}
