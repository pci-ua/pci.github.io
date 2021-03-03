
  window.addEventListener( 'load' , d => {
    document.querySelector( 'form' ).addEventListener( 'submit' , e => {
      let envoie = confirm(
`Une fois le message envoyé,
vous ne pourrez plus le changer.
Êtes-vous sûr de vouloir l'envoyez ainsi ?`
      );
      if( ! envoie ) {
        e.preventDefault();
      }
      return envoie;
    });
  });
