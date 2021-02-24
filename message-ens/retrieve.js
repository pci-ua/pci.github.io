window.addEventListener('load' , () => {
  document.body.addEventListener('load' , () => {
    fetch('https://pci.kher.nl/messages.php')
      .then( r => r.json() )
      .then( console.log )
      .catch( console.error )
  });
});
