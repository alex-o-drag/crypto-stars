import {getUsers} from './api/api.js';

const userRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
const usersTableBody = document.querySelector('.users-list__table-body');

const printUsersOnTable = () => {
  getUsers((users) => {
    users.forEach(() => {
      const userToAdd = userRowTemplate.cloneNode(true);
      usersTableBody.appendChild(userToAdd);
    });
  }, () => {
    /*onDataError();*/
  });
};




export {printUsersOnTable};
