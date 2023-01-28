import {getUsers} from './api/api.js';

const userRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
const usersTableBody = document.querySelector('.users-list__table-body');
const tabsControl = document.querySelector('.tabs__controls');
const isVerifiedCheckedInput = document.querySelector('#checked-users');

const getUsersSelectedType = () => {
  return tabsControl.querySelector('.tabs__control.is-active').dataset.value;
};

const checkUser = (user) => {
  if(user.status === getUsersSelectedType() && (!isVerifiedCheckedInput.checked || user.isVerified)) {
    return true;
  }
};

const clearTable = () => {
  usersTableBody.innerHTML = '';
};

const printUsersOnTable = () => {
  getUsers((users) => {
    users.filter((user) => checkUser(user)).forEach((user) => {
      const userToAdd = userRowTemplate.cloneNode(true);
      userToAdd.querySelector('.users-list__table-name span').textContent = user.userName;
      if(!user.isVerified) {
        userToAdd.querySelector('.users-list__table-name svg').remove();
      }
      if(user.status !== 'seller') {
        userToAdd.querySelector('.users-list__badges-list').remove();
      } else if(user.paymentMethods.length) {
        const paymentMethodTemplate = userToAdd.querySelector('.users-list__badges-item');

        userToAdd.querySelector('.users-list__badges-list').innerHTML = '';
        user.paymentMethods.forEach((method) => {
          const paymentMethod = paymentMethodTemplate.cloneNode(true);
          paymentMethod.textContent = method.provider;
          userToAdd.querySelector('.users-list__badges-list').appendChild(paymentMethod);
        });

      }
      usersTableBody.appendChild(userToAdd);
    });
  }, () => {
    /*onDataError();*/
  });
};

const changeUsersType = (evt) => {
  const currentActiveTab = tabsControl.querySelector('.is-active');
  const newActiveTab = evt.target;
  currentActiveTab.classList.remove('is-active');
  newActiveTab.classList.add('is-active');

  clearTable();
  printUsersOnTable();
};

const addTabsControlListenerClick = () => {
  tabsControl.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('tabs__control') && !evt.target.classList.contains('is-active')){
      changeUsersType(evt);
    }
  });
};

const changeVerifyValue = () => {
  clearTable();
  printUsersOnTable();
};


const addVerifiedUsersChangeListener = () => {
  isVerifiedCheckedInput.addEventListener('change', () => {
    changeVerifyValue();
  });
};

export {printUsersOnTable, addTabsControlListenerClick, addVerifiedUsersChangeListener};
