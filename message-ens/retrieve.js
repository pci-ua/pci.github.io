window.addEventListener('load' , () => {
    fetch('https://pci.kher.nl/messages.php')
      .then( r => r.json() )
      .then( obj => {

        console.log(obj);
        if(obj.status === "ok") {
          obj.messages.pop();
          let target = document.querySelector('main');
          for(let msg of obj.messages) {
            let div = document.createElement('div');
            div.innerHTML = `<h4>${msg.nom.toUpperCase()} ${msg.prenom}</h4><p><pre>${msg.message}</pre></p>`;;
            div.classList.add('message');
            target.appendChild(div);
          }
        } else {
          throw obj;
        }
      } )
      .catch( console.error );
});
