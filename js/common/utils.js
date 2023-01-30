const isEscape = (evt) => evt.key === 'Escape';

const insertUserDataToTemplate = (user, parentNode) => {
  parentNode.querySelector('[data-name]').textContent = user.userName;
  parentNode.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
  parentNode.querySelector('[data-cashlimit]').textContent = `${user.minAmount}\xA0₽\xA0-\xA0${user.exchangeRate * user.balance.amount}\xA0₽`;
  if(!user.isVerified) {
    parentNode.querySelector('[data-isverified]').remove();
  }
};

export {isEscape, insertUserDataToTemplate};

