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

const initValidation = (form, onSubmit) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const pristine = new Pristine(
    form, {
      classTo: 'custom-input',
      errorTextParent: 'custom-input',
      errorTextClass: 'custom-input__error',
    },
    true);

  form.addEventListener('submit', (evt) => {
    const isValidForm = pristine.validate();
    evt.preventDefault();

    if(!isValidForm) {
      pristine.getErrors();
      showSubmitMessageElement(form, false);
      return;
    }

    pristine.validate();
    onSubmit(form, () => {
      showSubmitMessageElement(form, true);
    }, () => {
      showSubmitMessageElement(form, false);
    });
  });
};

export {initValidation};

