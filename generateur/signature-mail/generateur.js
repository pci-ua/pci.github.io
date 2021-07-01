$=s=>document.querySelector(s);

[... $('form').querySelectorAll('input, select')].forEach( e => e.addEventListener('change',refresh) );

function refresh() {
	let nom = $('#nom').value;
	let prenom = $('#prenom').value;
	if(nom === '' || prenom === '') return;
	nom = nom.toUpperCase();
	prenom = prenom.split`-`.map(k => k[0].toUpperCase() + k.slice(1).toLowerCase() ).join`-`;

	let identitee = null;
	if($('#avec').checked) identitee = true;
	if($('#sans').checked) identitee = false;
	if(identitee === null) return;

	let categorie = $('select').value;
	if(categorie === '') return;

	let mail,titre;
	switch(categorie) {
		case "1️⃣":
			mail = "presidence@projetcohesion.info";
			titre = "Président";
			break;
		case "2️⃣":
			mail = "presidence@projetcohesion.info";
			titre = "Vice-Président";
			break;
		case "💰":
			mail = "tresorerie@projetcohesion.info";
			titre = "Trésorier";
			break;
		case "🚧":
			mail = "pcinfo.root@gmail.com";
			titre = "Responsable projet";
			break;
		case "✎":
			mail = "contact@projetcohesion.info";
			titre = "Secrétaire";
			break;
		case "🎤":
			mail = "contact@projetcohesion.info";
			titre = "Responsable communication";
			break;
		case "👤":
			mail = "contact@projetcohesion.info";
			titre = "Membre";
			break;
	}
	let info = {mail,categorie,nom,prenom,identitee,titre};
	console.info(info);

	let template = $('#newmethod').checked ? modernSignature(identitee,info) : oldSchoolSignature(identitee,info);

	$('#resultat').innerText = template;
	[...document.querySelectorAll('#rendu > *')].forEach(r=>r.innerHTML=template);

}

const oldSchoolSignature = (nominative,info) => (nominative) ?
`<table id="signature-pci" style="font-family:arial,sans-serif;font-size: 12pt;">
	<th>
	    <a href="https://www.projetcohesion.info" target="_blank">
        <img src="https://projetcohesion.info/assets/icon.png" alt="PC[i]" style="height:10rem;width:10rem;"/>
    </a>
	</th>

	<td style="color:#aaa;">
        <div style="border:none;border-left:1px solid orange;padding-left:1rem;">
            <h4 style="color:teal;margin:.5em 0;padding:0;">${info.nom} ${info.prenom}</h4>
            <span style="display:block;">${info.titre} de Projets et Cohésion en informatique</span>
            <span style="display:block;">2 Boulevard Lavoisier, 49000 Angers</span>
            <span style="display:block;"><a href="mailto:${info.mail}" style="text-decoration:none;color:#aaa;display:block;">${info.mail}</a></span>
            <span style="display:block;"><a href="https://www.projetcohesion.info" target="_blank" style="color:#aaa;display:block;">https://www.projetcohesion.info/</a></span>
        </div>
	</td>
</table>` :
`<table id="signature-pci" style="font-family:arial,sans-serif;font-size: 12pt;">
	<th>
	    <a href="https://www.projetcohesion.info" target="_blank">
        <img src="https://projetcohesion.info/assets/icon.png" alt="PC[i]" style="height:10rem;width:10rem;"/>
    </a>
	</th>

	<td style="color:#aaa;">
        <div style="border:none;border-left:1px solid orange;padding-left:1rem;">
            <h4 style="color:teal;margin:.5em 0;padding:0;">${info.titre}</h4>
            <span style="display:block;">${info.titre} de Projets et Cohésion en informatique</span>
            <span style="display:block;">2 Boulevard Lavoisier, 49000 Angers</span>
            <span style="display:block;"><a href="mailto:${info.mail}" style="text-decoration:none;color:#aaa;display:block;">${info.mail}</a></span>
            <span style="display:block;"><a href="https://www.projetcohesion.info" target="_blank" style="color:#aaa;display:block;">https://www.projetcohesion.info/</a></span>
        </div>
	</td>
</table>`;

const modernSignature = (nominative,info) => (nominative) ?
`<div id="signature-pci" style="font-family:arial,sans-serif;display:grid;grid-template-columns:10rem auto;grid-template-rows:10rem; align-items: center;">
    <a href="https://www.projetcohesion.info" target="_blank">
        <img src="https://projetcohesion.info/assets/icon.png" alt="PC[i]" style="height:10rem;width:10rem;"/>
    </a>

    <div style="color:#aaa;position:relative;">
        <div style="border:none;border-left:1px solid orange;padding-left:1rem;">
            <h4 style="color:teal;margin:.5em 0;padding:0;">${info.nom} ${info.prenom}</h4>
            <span style="display:block;">${info.titre} de Projets et Cohésion en informatique</span>
            <span style="display:block;">2 Boulevard Lavoisier, 49000 Angers</span>
            <span style="display:block;"><a href="mailto:${info.mail}" style="text-decoration:none;color:#aaa;display:block;">${info.mail}</a></span>
            <span style="display:block;"><a href="https://www.projetcohesion.info" target="_blank" style="color:#aaa;display:block;">https://www.projetcohesion.info/</a></span>
        </div>
    </div>
</div>` :
`<div id="signature-pci" style="font-family:arial,sans-serif;display:grid;grid-template-columns:10rem auto;grid-template-rows:10rem; align-items: center;">
    <a href="https://www.projetcohesion.info" target="_blank">
        <img src="https://projetcohesion.info/assets/icon.png" alt="PC[i]" style="height:10rem;width:10rem;"/>
    </a>

    <div style="color:#aaa;position:relative;">
        <div style="border:none;border-left:1px solid orange;padding-left:1rem;">
            <h4 style="color:teal;margin:.5em 0;padding:0;">${info.titre}</h4>
            <span style="display:block;">${info.titre} de Projets et Cohésion en informatique</span>
            <span style="display:block;">2 Boulevard Lavoisier, 49000 Angers</span>
            <span style="display:block;"><a href="mailto:${info.mail}" style="text-decoration:none;color:#aaa;display:block;">${info.mail}</a></span>
            <span style="display:block;"><a href="https://www.projetcohesion.info" target="_blank" style="color:#aaa;display:block;">https://www.projetcohesion.info/</a></span>
        </div>
    </div>
</div>`;
