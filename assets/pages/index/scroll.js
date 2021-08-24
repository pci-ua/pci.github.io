window.addEventListener( 'load' , () => {
  document
    .getElementById('goDown')
    .addEventListener( 'click' , _ =>
      document
        .querySelector('main')
        .scrollIntoView({'behavior':'smooth'}));
});
