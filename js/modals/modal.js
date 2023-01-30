import {isEscape} from '../common/utils.js';

const modalBuy = document.querySelector('.modal--buy');
const modalSell = document.querySelector('.modal--sell');
const body = document.querySelector('body');

const closeModal = () => {
  const modal = document.querySelector('.modal.modal-active');
  modal.style.display = 'none';
  body.classList.remove('scroll-lock');
  modal.classList.remove('modal-active');
};

const onEscKeydown = (evt) => {
  if (isEscape(evt)) {
    document.removeEventListener('keydown', onEscKeydown);
    closeModal();
  }
};

const onCloseBtnClick = () => {
  const closeModalBtn = document.querySelector('.modal.modal-active .close-btn');
  closeModalBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscKeydown);
  closeModal();
};

const showModal = (user) => {
  const currentModal = user.status === 'seller' ? modalBuy : modalSell;
  const closeModalBtn = currentModal.querySelector('.close-btn');

  currentModal.classList.add('modal-active');
  body.classList.add('scroll-lock');

  closeModalBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscKeydown);

  if(user.status === 'seller') {
    currentModal.querySelector('[data-name]').textContent = user.userName;
    currentModal.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
    currentModal.querySelector('[data-cashlimit]').textContent = `${user.minAmount}\xA0₽\xA0-\xA0${user.exchangeRate * user.balance.amount}\xA0₽`;
    currentModal.querySelector('[data-rubinput]').setAttribute('placeholder', user.minAmount);

    const paymentMethodSelect = currentModal.querySelector('[data-paymentmetods]');
    user.paymentMethods.forEach((method) => {
      const newOption = document.createElement('option');
      newOption.textContent = method.provider;
      newOption.setAttribute('value', method.accountNumber || '');
      paymentMethodSelect.appendChild(newOption);
    });

    paymentMethodSelect.addEventListener('change', (evt) => {
      currentModal.querySelector('[data-bankcardinput]').setAttribute('value', evt.target.value);
    });
  }

  currentModal.style.display = 'block';
};

export {showModal};
