window.addEventListener( 'load' , () => {
  document
    .getElementById('goDown')
    .addEventListener( 'click' , e =>
      document
        .querySelector('article')
        .scrollIntoView({'behavior':'smooth'}));
});
