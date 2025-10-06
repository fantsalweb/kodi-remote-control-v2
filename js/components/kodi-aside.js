import { LitElement, html, css } from '../lib/lit.min.js';

class KodiAside extends LitElement {
  static styles = css`
    aside {
      width: 200px;
      background: #f0f0f0;
      padding: 10px;
      box-sizing: border-box;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    button {
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background: #0056b3;
    }
  `;
  render() {
    return html`
      <aside>
        <nav>
          <button>Play</button>
          <button>Stop</button>
          <button>Menu</button>
        </nav>
      </aside>
    `;
  }
}
customElements.define('kodi-aside', KodiAside);
