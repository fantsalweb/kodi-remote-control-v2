import { LitElement, html, css } from '../lib/lit.min.js';

class KodiAside extends LitElement {
  static styles = css
    aside { width: 200px; background: #f0f0f0; }
  ;
  render() {
    return html<aside>Sidebar content</aside>;
  }
}
customElements.define('kodi-aside', KodiAside);
