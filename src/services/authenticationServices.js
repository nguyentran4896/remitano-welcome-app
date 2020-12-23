import {BehaviorSubject} from 'rxjs';

import config from '../config.json';
import helpers from '../helpers/helpers';

let currentUserSubject;
try {
  currentUserSubject= new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
} catch (error) {
  console.log(error);
}


export default {
  login,
  logout,
  signUp,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token') || undefined,
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
        console.log(err);
        alert(err);
      });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

function signUp(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  return fetch(`${config.baseApi}/signup`, requestOptions)
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));

        currentUserSubject.next(user);
        return user;
      })
      .catch((err) =>{
        console.log(err);
        alert(err);
      });
}
