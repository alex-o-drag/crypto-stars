import {isEscape} from '../common/utils.js';
import {setModalInfo} from './trading.js';
import {getAccountInfo, makeDeal} from '../api/api.js';
import {initValidation} from '../forms/validation.js';

const modalBuy = document.querySelector('#modal-buy').content.querySelector('.modal');
const modalSell = document.querySelector('#modal-sell').content.querySelector('.modal');
const body = document.querySelector('body');
const map = document.querySelector('#map');

const closeModal = () => {
  const modal = document.querySelector('.modal');
  body.classList.remove('scroll-lock');
  modal.remove();
  map.style.zIndex = 'auto';
};

const onEscKeydown = (evt) => {
  if (isEscape(evt)) {
    document.removeEventListener('keydown', onEscKeydown);
    closeModal();
  }
};

const onModalElementClick = () => {
  document.removeEventListener('keydown', onEscKeydown, body);
  closeModal();
};

const showModal = (contractor) => {
  const currentModal = contractor.status === 'seller' ? modalBuy.cloneNode(true) : modalSell.cloneNode(true);
  const closeModalBtn = currentModal.querySelector('.close-btn');
  const closeModalOverlay = currentModal.querySelector('.modal__overlay');
  const form = currentModal.querySelector('.modal-form');
  closeModalBtn.addEventListener('click', onModalElementClick);
  closeModalOverlay.addEventListener('click', onModalElementClick);
  document.addEventListener('keydown', onEscKeydown);
  map.style.zIndex = '2';
  getAccountInfo((user) => {
    setModalInfo(contractor, currentModal, user, () => {
      initValidation(form, makeDeal, contractor, user);
      body.classList.add('scroll-lock');
      body.appendChild(currentModal);
    });
  });
};

export {showModal};
