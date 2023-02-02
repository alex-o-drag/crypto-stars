import {getAccountInfo} from '../api/api.js';

const currenciesInputBinding = (rubInput, keksInput, rate) => {
  [rubInput, keksInput].forEach((input) => {
    input.addEventListener('keyup', () => {
      let newValue;
      let anotherInput;
      if(input === rubInput) {
        newValue = (+rubInput.value / +rate).toFixed(4);
        anotherInput = keksInput;
      } else {
        newValue = (+keksInput.value * +rate).toFixed(4);
        anotherInput = rubInput;
      }
      anotherInput.value = newValue || '';
    });
  });
};

const setModalInfo = (user, modal, profile, callback) => {
  getAccountInfo(() => {
    const rubInput = modal.querySelector('[data-rubinput]');
    const keksInput = modal.querySelector('[data-keksinput]');
    const paymentMethodSelect = modal.querySelector('[data-paymentmetods]');
    let paymentMethods;
    const walletInput = modal.querySelector('[data-wallet]');
    let wallet;
    let sendingCurrency;
    let receivingCurrency;

    modal.querySelector('[data-name]').textContent = user.userName;
    modal.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
    modal.querySelector('[data-cashlimit]').textContent = `${user.minAmount * user.exchangeRate}\xA0₽\xA0-\xA0${(user.exchangeRate * user.balance.amount).toFixed(2)}\xA0₽`;
    if(!user.isVerified) {
      modal.querySelector('[data-isverified]').remove();
    }
    if(user.status === 'seller') {
      paymentMethods = user.paymentMethods;
      wallet = profile.wallet.address;
      sendingCurrency = 'RUB';
      receivingCurrency = 'KEKS';
    } else {
      paymentMethods = profile.paymentMethods;wallet = user.wallet.address;
      wallet = user.wallet.address;
      sendingCurrency = 'KEKS';
      receivingCurrency = 'RUB';
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

    modal.querySelector('[data-contractorid]').setAttribute('value', user.id);
    modal.querySelector('[data-exchangerateinput]').setAttribute('value', user.exchangeRate);
    modal.querySelector('[data-sendingcurrency]').setAttribute('value', sendingCurrency );
    modal.querySelector('[data-receivingcurrency]').setAttribute('value', receivingCurrency);


    currenciesInputBinding(rubInput, keksInput, user.exchangeRate);
    callback();
  }, (error) => {

  });
};

export {setModalInfo};
