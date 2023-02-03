import {DEFAULT_PASSWORD} from '../common/params.js';

const successMessage = document.querySelector('#submit-message-success').content.querySelector('.modal__validation-message');
const errorMessage = document.querySelector('#submit-message-error').content.querySelector('.modal__validation-message');

const showSubmitMessageElement = (form, isSuccess) => {
  const output = form.querySelector('.submit-message');
  output.style.width = '100%';
  output.innerHTML = '';
  let template;
  if(isSuccess) {
    template = successMessage;
  } else {
    template = errorMessage;
  }
  output.append(template.cloneNode(true));
};

const initValidation = (form, onSubmit, contractor, user) => {
  const pristine = new Pristine(
    form, {
      classTo: 'custom-input',
      errorTextParent: 'custom-input',
      errorTextClass: 'custom-input__error',
    },
    true);

  const rubInput = form.querySelector('[data-rubinput]');
  const keksInput = form.querySelector('[data-keksinput]');
  const cardInput = form.querySelector('[data-bankcardinput]');
  const paymentSelect = form.querySelector('[data-paymentmetods]');
  const passwordInput = form.querySelector('[data-password-input]');

  [rubInput, keksInput].forEach((element) => {
    pristine.addValidator(element, (value) => !isNaN(+value), 'Значение должно быть числом');
    element.addEventListener('input', () => {
      if(element === rubInput) {
        pristine.validate(keksInput);
        return;
      }
      pristine.validate(rubInput);
    });
  });

  pristine.addValidator(rubInput, (value) => +value >= contractor.minAmount, 'Значение должно быть больше минимального лимита');
  pristine.addValidator(rubInput, (value) => +value <= (contractor.exchangeRate * contractor.balance.amount), 'Значение должно быть меньше максимального лимита');
  pristine.addValidator(cardInput, () => paymentSelect.value !== '', 'Для заполнения поля необходимо выбрать платёжную систему');

  if(contractor.status === 'buyer') {
    pristine.addValidator(keksInput, (value) => +value <= user.balances.find((element) => element.currency === 'KEKS').amount, 'У вас на счету нет такого количества КЕКСов');
    pristine.addValidator(rubInput, (value) => +value <= contractor.balance['RUB'], 'Такой суммы нет у пользователя нет');
  } else {
    pristine.addValidator(rubInput, (value) => +value <= user.balances.find((element) => element.currency === 'RUB').amount, 'Указанная сумма больше средств чем у вас на счету');
  }

  pristine.addValidator(passwordInput, (value) => +value === DEFAULT_PASSWORD, 'Неверный пароль');
  paymentSelect.addEventListener('change', () => {
    pristine.validate(cardInput);
  });

  form.addEventListener('submit', (evt) => {
    const isValidForm = pristine.validate();
    evt.preventDefault();

    if(!isValidForm) {
      pristine.getErrors();
      showSubmitMessageElement(form, false);
      return;
    }

    onSubmit(form, () => {
      showSubmitMessageElement(form, true);
    }, () => {
      showSubmitMessageElement(form, false);
    });
  });
};

export {initValidation};


//0	Object { fieldName: "paymentPassword", fieldValue: 0, errorMessage: "should be a correct payment password" }
