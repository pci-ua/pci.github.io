window.addEventListener( 'load' , () => {
  document
    .getElementById('goDown')
    .addEventListener( 'click' , e =>
      document
        .querySelector('main')
        .scrollIntoView({'behavior':'smooth'}));
});
