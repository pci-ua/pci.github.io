window.addEventListener( 'load' , async () => {
  let element = document.createElement('footer');
  //               Ancienne commande ne fonctionnant pas en local
  //let content = await fetch(`${document.location.origin}/assets/footer/footer.html`).then( reponse => reponse.text() );

  //               Nouvelle commande fonctionnant aussi en local
  let content = await fetch(`assets/footer/footer.html`).then( reponse => reponse.text() );
  element.innerHTML = content;
  document.body.appendChild(element);
});
