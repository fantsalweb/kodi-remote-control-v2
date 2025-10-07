import { LitElement, html, css } from 'lit';
// 💡 IMPORTAR LOS COMPONENTES HIJOS AQUÍ (TODOS)
import './kodi-header.js'; 
import './kodi-aside.js';
import './kodi-main.js';
import './kodi-config.js';

class KodiApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .container {
      display: flex;
      flex: 1;
    }
    kodi-aside {
      flex: 0 0 200px;
    }
    kodi-main {
      flex: 1;
    }
  `;
  render() {
    return html`
      <kodi-header></kodi-header>
      <div class="container">
        <kodi-aside></kodi-aside>
        <kodi-main></kodi-main>
      </div>
    `;
  }
}
customElements.define('kodi-app', KodiApp);
