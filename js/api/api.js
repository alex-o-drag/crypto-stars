import {API_ADDRESS} from '../common/params.js';

const getUsers = (onSuccess, onError) => {
  fetch(`${API_ADDRESS}/contractors`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка получения данных');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
};

const getAccountInfo = (onSuccess, onError) => {
  fetch(`${API_ADDRESS}/user`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка получения данных');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
};

export {getUsers, getAccountInfo};
