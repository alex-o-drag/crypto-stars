import {getAccountInfo} from '../api/api.js';

const convertRubToKeks = (rubs, rate) => (rubs / rate);

const convertKeksToRubs = (keks, rate) => (keks * rate);

const currenciesInputBinding = (rubInput, keksInput, rate) => {
  [rubInput, keksInput].forEach((input) => {
    input.addEventListener('input', () => {
      let newValue;
      let anotherInput;
      if(input === rubInput) {
        newValue = convertRubToKeks(+rubInput.value, +rate);
        anotherInput = keksInput;
      } else {
        newValue = convertKeksToRubs(+keksInput.value, +rate);
        anotherInput = rubInput;
      }
      anotherInput.value = newValue || '';
    });
  });
};

const setModalInfo = (contractor, modal, user, callback) => {
  getAccountInfo(() => {
    const rubInput = modal.querySelector('[data-rubinput]');
    const keksInput = modal.querySelector('[data-keksinput]');
    const paymentMethodSelect = modal.querySelector('[data-paymentmetods]');
    const walletInput = modal.querySelector('[data-wallet]');
    const changeAllButton = modal.querySelector('.change-all-button');
    let paymentMethods;
    let wallet;
    let sendingCurrency;
    let receivingCurrency;

    const changeAll = () => {
      //console.log(contractor.balance.amount * contractor.exchangeRate);
      modal.querySelector('[data-keksinput]').value = contractor.balance.amount;
      modal.querySelector('[data-rubinput]').value = convertKeksToRubs(+contractor.balance.amount, contractor.exchangeRate);
    };

    changeAllButton.addEventListener('click', changeAll);

    modal.querySelector('[data-name]').textContent = contractor.userName;
    modal.querySelector('[data-exchangerate]').textContent = contractor.exchangeRate;
    modal.querySelector('[data-cashlimit]').textContent = `${contractor.minAmount}\xA0₽\xA0-\xA0${(contractor.exchangeRate * contractor.balance.amount)}\xA0₽`;
    if(!contractor.isVerified) {
      modal.querySelector('[data-isverified]').remove();
    }
    if(contractor.status === 'seller') {
      paymentMethods = contractor.paymentMethods;
      wallet = user.wallet.address;
      sendingCurrency = 'RUB';
      receivingCurrency = 'KEKS';
    } else {
      paymentMethods = user.paymentMethods;
      wallet = contractor.wallet.address;
      sendingCurrency = 'KEKS';
      receivingCurrency = 'RUB';
    }

    walletInput.setAttribute('value', wallet);

    paymentMethods.forEach((method) => {
      const newOption = document.createElement('option');
      newOption.textContent = method.provider;
      newOption.setAttribute('value', method.provider || '');
      paymentMethodSelect.appendChild(newOption);
    });

    paymentMethodSelect.addEventListener('change', (evt) => {
      const currentMethod = paymentMethods.find((element) => element.provider === evt.target.value);
      modal.querySelector('[data-bankcardinput]').setAttribute('value', currentMethod.accountNumber || '');
    });

    modal.querySelector('[data-contractorid]').setAttribute('value', contractor.id);
    modal.querySelector('[data-exchangerateinput]').setAttribute('value', contractor.exchangeRate);
    modal.querySelector('[data-sendingcurrency]').setAttribute('value', sendingCurrency );
    modal.querySelector('[data-receivingcurrency]').setAttribute('value', receivingCurrency);

    currenciesInputBinding(rubInput, keksInput, contractor.exchangeRate);

    callback();
  }, (error) => {
    console.error(error);
  });
};

export {setModalInfo};
