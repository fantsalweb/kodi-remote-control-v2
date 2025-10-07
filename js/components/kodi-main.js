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
    currentView: { type: String },
    viewContent: { type: String }
  };
  constructor() {
    super();
    this.currentView = 'home'; // Vista por defecto
    this.viewContent = '';
    this.baseDir = this.getBaseDir();
    this.loadView('home');
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
  render() {
    return html`
      <main>
        <button @click=${() => this.loadView('categories')}>Test Categories</button>
        ${this.viewContent ? unsafeHTML(this.viewContent) : html`<p>Loading...</p>`}
      </main>
    `;
  }
}

customElements.define('kodi-main', KodiMain);