import { LitElement, html, css } from '../lib/lit.min.js';

class KodiMain extends LitElement {
  static styles = css`
    main {
      flex: 1;
      padding: 20px;
      background: #fff;
    }
  `;
  render() {
    return html`<main>Main content area</main>`;
  }
}
customElements.define('kodi-main', KodiMain);
