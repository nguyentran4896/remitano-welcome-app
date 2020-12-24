import {toast} from 'react-toastify';

import config from '../config.json';
import helpers from '../helpers/helpers';

import authenticationServices from './authenticationServices';

const TOAST_DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};


export default {
  voteUp,
  voteDown,
  unVote,
};

async function voteUp(video, id) {
  if (video && video.likes && !video.likes.includes(id)) {
    video.likes.push(id);
  }
  return await updateMovie(video, id);
}

async function voteDown(video, id) {
  if (video && video.disLikes && !video.disLikes.includes(id)) {
    video.disLikes.push(id);
  }
  return await updateMovie(video, id);
}

async function unVote(video, id) {
  if (video && video.likes && video.disLikes) {
    video.likes = video.likes.filter((v) => v !== id);
    video.disLikes = video.disLikes.filter((v) => v !== id);
  }
  console.log(video);
  return await updateMovie(video, id);
}

function updateMovie(video) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}` || undefined,
    },
    body: JSON.stringify(video),
    credentials: 'include',
  };

  return fetch(`${config.baseApi}/movies/${video._id || video.id}`, requestOptions)
      .then(helpers.handleResponse)
      .then((video) => {
        toast.success('Done', TOAST_DEFAULT_OPTIONS);
        return video;
      })
      .catch((err) =>{
        toast.error(err, TOAST_DEFAULT_OPTIONS);
      });
}
