window.addEventListener( 'load' , () => {
  document
    .querySelector('form')
    .addEventListener('submit', async e => {
      e.preventDefault();
      let adresse = document.querySelector('#courriel').value;
      fetch('https://pci.kher.nl/discord/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: adresse
        }
      )
        .then( console.log )
        .catch( console.error );
      return false;
    });
});
