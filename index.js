(function() {
  const NAV_LINKS = [
    { text: 'Inicio',       href: 'index.html' },
    { text: 'Paradigmas',   href: 'posts/arquitectura-web-cliente-servidor.html' },
    { text: 'Manejo de HTML', href: 'posts/manejo_html/manejo-html.html' },
    { text: 'Manejo de CSS',  href: 'posts/manejo-css/manejo-css.html' },
    { text: 'Manejo de JavaScript', href: 'posts/manejo_js/manejo_js.html' },
    { text: 'DOM',           href: 'posts/DOM/DOM.html' },
    { text: 'Formularios',   href: 'posts/formularios/formularios.html' },
  ];

  // Profundidad del archivo actual
  const depth = parseInt(document.currentScript.getAttribute('data-depth') || '0'); 

  const root = depth > 0 ? '../'.repeat(depth) : '';
  const currentFile = window.location.pathname.split('/').pop();


  const header = document.createElement('header');
  
  let navHtml = '';
  for (let i = 0; i < NAV_LINKS.length; i++) {
    let l = NAV_LINKS[i];
    let sel = l.href.split('/').pop() === currentFile ? ' class="selected"' : '';
    navHtml += '      <a href="' + root + l.href + '"' + sel + '>' + l.text + '</a>\n';
  }
  header.innerHTML =
    '    <a class="blog_title" href="' + root + 'index.html">Paradigmas de Programaci\u00f3n</a>\n' +
    '    <nav class="menu">\n' + navHtml + '    </nav>\n  ';

  document.body.insertBefore(header, document.body.firstChild);
})();
