import { LitElement, html, css } from '../lib/lit.min.js';

class KodiApp extends LitElement {
  static styles = css`
    @import url('../../css/style.css');
    :host { display: block; }
    .container { display: flex; }
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