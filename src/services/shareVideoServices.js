import config from '../config.json';
import helpers from '../helpers/helpers';

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
        console.log(data);
        return data;
      })
      .catch((err) =>{
        console.log(err);
        alert(err);
      });
}
