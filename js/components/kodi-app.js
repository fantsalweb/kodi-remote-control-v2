import { LitElement, html, css } from '../lib/lit.min.js';

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
      flex: 0 0 200px; /* Fija el ancho del sidebar */
    }
    kodi-main {
      flex: 1; /* Ocupa el resto del espacio */
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
