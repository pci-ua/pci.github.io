window.addEventListener( 'load' , async () => {
  let element = document.createElement('footer');
  let content = await fetch(`/assets/modules/footer/footer.html`).then( reponse => reponse.text() );
  element.innerHTML = content;
  document.body.appendChild(element);
});
