window.addEventListener( 'load' , () => {
  document
    .getElementById('goDown')
    .addEventListener( 'click' , e =>
      document
        .querySelector('nav')
        .scrollIntoView({'behavior':'smooth'}));
});
