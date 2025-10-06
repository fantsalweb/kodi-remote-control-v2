import { LitElement, html, css } from '../lib/lit.min.js';

class KodiHeader extends LitElement {
  static styles = css`
    header {
      background: #333;
      color: white;
      padding: 10px;
      text-align: center;
    }
  `;
  render() {
    return html`<header>Kodi Remote Control</header>`;
  }
}
customElements.define('kodi-header', KodiHeader);
