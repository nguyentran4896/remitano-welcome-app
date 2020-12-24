import {BehaviorSubject} from 'rxjs';
import {toast} from 'react-toastify';

import config from '../config.json';
import helpers from '../helpers/helpers';

const TOAST_DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

let currentUserSubject;
try {
  currentUserSubject= new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
} catch (error) {
  currentUserSubject = new BehaviorSubject(null);
}


export default {
  login,
  logout,
  signUp,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  updateCurrentUser,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
    credentials: 'include',
  };

  return fetch(`${config.baseApi}/auth`, requestOptions)
      .then(helpers.handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', user ? JSON.stringify(user) : '');
        localStorage.setItem('id_token', user ? user.token : '');

        console.log(user);
        currentUserSubject.next(user);

        return user;
      })
      .catch((err) =>{
        toast.error(err, TOAST_DEFAULT_OPTIONS);
      });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  localStorage.removeItem('id_token');
  currentUserSubject.next(null);
}

function signUp(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  return fetch(`${config.baseApi}/signup`, requestOptions)
      .then(helpers.handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('id_token', user ? user.token : '');

        currentUserSubject.next(user);
        return user;
      })
      .catch((err) =>{
        toast.error(err, TOAST_DEFAULT_OPTIONS);
      });
}

function updateCurrentUser(user) {
  user && currentUserSubject.next(user);
}
