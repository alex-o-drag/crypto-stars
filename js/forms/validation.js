const successMessage = document.querySelector('#submit-message-success').content.querySelector('.modal__validation-message');
const errorMessage = document.querySelector('#submit-message-error').content.querySelector('.modal__validation-message');

const showSubmitMessageElement = (form, isSuccess) => {
  const output = form.querySelector('.submit-message');
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
  pristine.addValidator(rubInput, (value) => +value <= user.balances.find((element) => element.currency === 'RUB').amount, 'Указанная сумма больше средств у вас на счету');

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

  paymentSelect.addEventListener('change', () => {
    pristine.validate(cardInput);
  });
};

export {initValidation};

