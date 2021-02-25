window.addEventListener('load' , () => {
    fetch('https://pci.kher.nl/messages.php')
      .then( r => r.json() )
      .then( obj => {
        if(obj.status === "ok") {
          obj.messages.pop();
          let target = document.querySelector('main');
          for(let msg of obj.messages) {
            let div = document.createElement('div');
            let nom = DOMPurify.sanitize( msg.nom.toUpperCase() );
            let prenom = DOMPurify.sanitize( msg.prenom );
            let message = DOMPurify.sanitize( msg.message );
            div.innerHTML = `<h4>${nom} ${prenom}</h4><p>${message}</p>`;;
            div.classList.add('message');
            target.appendChild(div);
          }
        } else {
          throw obj;
        }
      } )
      .catch( console.error );
});
