import {getUsers} from '../api/api.js';
import {addSellerToMap, deleteMarkers} from './map.js';
import {showModal} from '../modals/modal.js';

const userRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
const usersTableBody = document.querySelector('.users-list__table-body');
const tabsControl = document.querySelector('.users-type-tabs');
const isVerifiedCheckedInput = document.querySelector('#checked-users');
const uiContainers = document.querySelectorAll('.ui-info');
const serverErrorContainer = document.querySelector('.no-response-message-block');

const getUsersSelectedType = () => tabsControl.querySelector('.tabs__control.is-active').dataset.value;

const checkUser = (user) => {
  if(user.status === getUsersSelectedType() && (!isVerifiedCheckedInput.checked || user.isVerified)) {
    return true;
  }
};

const clearTable = () => {
  usersTableBody.innerHTML = '';
};

const showServerError = () => {
  uiContainers.forEach((container) => {
    container.style.display = 'none';
  });

  serverErrorContainer.style.display = 'block';
};

const printUsersOnTable = () => {
  deleteMarkers();
  getUsers((users) => {
    users.filter((user) => checkUser(user)).forEach((user) => {
      const userToAdd = userRowTemplate.cloneNode(true);
      let maxAmount;
      userToAdd.querySelector('.users-list__table-name span').textContent = user.userName;
      userToAdd.querySelector('.users-list__table-currency').textContent = user.balance.currency;
      userToAdd.querySelector('.users-list__table-exchangerate').textContent = `${user.exchangeRate}\xA0₽`;

      if(!user.isVerified) {
        userToAdd.querySelector('.users-list__table-name svg').remove();
      }
      if(user.status === 'buyer') {
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
      if(user.status === 'seller') {
        maxAmount = (user.exchangeRate * user.balance.amount).toFixed(2);
        if(user.coords) {
          addSellerToMap(user);
        }
      } else {
        maxAmount = (user.exchangeRate * user.balance.amount).toFixed(2);
      }
      userToAdd.querySelector('.users-list__table-cashlimit').textContent = `${maxAmount}\xA0₽`;

      userToAdd.querySelector('.users-list__table-btn .btn').addEventListener('click', () => {
        showModal(user);
      });

      usersTableBody.appendChild(userToAdd);
    });

  }, () => {
    showServerError();
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

const addTabsControlClickListener = () => {
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

export {printUsersOnTable, addTabsControlClickListener, addVerifiedUsersChangeListener, serverErrorContainer, showServerError};
