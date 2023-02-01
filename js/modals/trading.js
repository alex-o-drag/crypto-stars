import {getAccountInfo} from '../api/api.js';

const setModalInfo = (user, modal, profile, callback) => {
  getAccountInfo(() => {

    modal.querySelector('[data-name]').textContent = user.userName;
    modal.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
    modal.querySelector('[data-cashlimit]').textContent = `${user.minAmount}\xA0₽\xA0-\xA0${user.exchangeRate * user.balance.amount}\xA0₽`;
    if(!user.isVerified) {
      modal.querySelector('[data-isverified]').remove();
    }

    const paymentMethodSelect = modal.querySelector('[data-paymentmetods]');
    let paymentMethods;
    const walletInput = modal.querySelector('[data-wallet]');
    let wallet;

    if(user.status === 'seller') {
      paymentMethods = user.paymentMethods;
      wallet = profile.wallet.address;
    } else {
      paymentMethods = profile.paymentMethods;wallet = user.wallet.address;
      wallet = user.wallet.address;
    }

    walletInput.setAttribute('placeholder', wallet);

    paymentMethods.forEach((method) => {
      const newOption = document.createElement('option');
      newOption.textContent = method.provider;
      newOption.setAttribute('value', method.accountNumber || '');
      paymentMethodSelect.appendChild(newOption);
    });

    paymentMethodSelect.addEventListener('change', (evt) => {
      modal.querySelector('[data-bankcardinput]').setAttribute('value', evt.target.value);
    });


    callback();
  });
};

export {setModalInfo};
