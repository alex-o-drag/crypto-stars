const infoControl = document.querySelector('.info-type-tabs');

const changeInfoBlock = (evt) => {
  const currentActiveTab = infoControl.querySelector('.is-active');
  const newActiveTab = evt.target;
  currentActiveTab.classList.remove('is-active');
  newActiveTab.classList.add('is-active');

  const currentActiveBlock = document.querySelector('.users-toggle-block:not(.hidden)');
  const newActiveBlock = document.querySelector('.users-toggle-block.hidden');

  currentActiveBlock.classList.add('hidden');
  newActiveBlock.classList.remove('hidden');
};

const addChangeInfoBlockClickListener = () => {
  infoControl.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('tabs__control') && !evt.target.classList.contains('is-active')){
      changeInfoBlock(evt);
    }
  });
};

export {addChangeInfoBlockClickListener};
