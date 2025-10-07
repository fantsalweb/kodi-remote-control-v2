import { LitElement, html, css } from 'lit'; // Importación estándar de 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class KodiMain extends LitElement {
  static styles = css`
    main {
      flex: 1;
      padding: 20px;
      background: #fff;
    }
  `;
  static properties = {
    currentView: { type: String }
  };
  constructor() {
    super();
    this.currentView = 'home'; // Vista por defecto
    // this.viewContent = '';
    this.baseDir = this.getBaseDir();
    // this.loadView('home');
  }
  getBaseDir() {
    const args = process.argv; // Obtener argumentos del proceso
    const baseDirArg = args.find(arg => arg.startsWith('--base-dir='));
    return baseDirArg ? baseDirArg.split('=')[1] : '';
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('change-view', (e) => {
      console.log('Received change-view:', e.detail.view);
      this.loadView(e.detail.view);
    });
  }
  disconnectedCallback() {
    document.removeEventListener('change-view', () => {});
    super.disconnectedCallback();
  }
  loadView(view) {
    this.currentView = view;
    if (view === 'config') {
      this.viewContent = ''; // Reseteamos el contenido HTML
      this.requestUpdate(); // Forzamos a Lit a renderizar
      return; // Ya no continuamos con la lógica de Electron/fs
    }
    try {
      const fs = require('fs');
      const path = require('path');
      const viewPath = path.join(this.baseDir, 'views', `${view}.html`); // Usar baseDir
      console.log('Loading view:', viewPath);
      this.viewContent = fs.readFileSync(viewPath, 'utf8');
      console.log('Loaded content:', this.viewContent);
    } catch (error) {
      this.viewContent = `<p>Error loading ${view}: ${error.message}</p>`;
      console.log('Error loading view:', error.message);
    }
    this.requestUpdate();
  }
  // **El corazón de la migración: el renderizado condicional**
  _renderContent() {
      switch (this.currentView) {
          case 'home':
              // Nota: views/home.html todavía existe y usa contenido estático.
              // Si quieres que funcione, necesitas cargar el HTML de nuevo (Temporal)
              return html`<div id="content-list"><h2>Home</h2><p>Contenido principal de Kodi aquí (dinámico via API).</p></div>`;
          case 'categories':
              // Nota: Todavía usa el antiguo sistema FS. Mantén la llamada a FS o usa HTML estático temporal
              return html`<div id="content-list"><h2>Categories</h2><p>Gestión de categorías aquí. (Antiguo FS)</p></div>`;
          case 'config':
              // 🎉 ¡USAMOS EL COMPONENTE LIT!
              return html`<kodi-config></kodi-config>`; 
          case 'config-addons':
              // Temporal
              return html`<div id="content-list"><h2>Config Addons</h2><p>Configuración de addons aquí. (Antiguo FS)</p></div>`;
          default:
              return html`<p>Selecciona una opción del menú.</p>`;
      }
  }
  render() {
    return html`
      <main>
        ${this._renderContent()}
      </main>
    `;
  }
}

customElements.define('kodi-main', KodiMain);