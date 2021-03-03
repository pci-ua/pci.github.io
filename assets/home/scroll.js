window.addEventListener( 'load' , () => {
  document
    .getElementById('goDown')
    .addEventListener( 'click' , e =>
      document
        .querySelector('.widget')
        .scrollIntoView({'behavior':'smooth'}));
});
