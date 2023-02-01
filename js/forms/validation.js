const initValidation = (form) => {

  const pristine = new Pristine(
    form, {
      classTo: 'custom-input',
      errorTextParent: 'custom-input',
      errorTextClass: 'custom-input__error',
    },
    true);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidForm = pristine.validate();

    if(!isValidForm) {
      pristine.getErrors();
      return;
    }
    pristine.validate();
  });
};

export {initValidation};

