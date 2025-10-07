import { LitElement, html, css } from 'lit';

class KodiAside extends LitElement {
  static properties = { active: { type: String } };
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
    button.active {
      background: #28a745;
    }
  `;
  handleClick(view) {
    console.log('Clicked view:', view);
    this.active = view;
    this.dispatchEvent(new CustomEvent('change-view', { detail: { view }, bubbles: true, composed: true }));
  }
  render() {
    return html`
      <aside>
        <nav>
          <button 
            class="${this.active === 'home' ? 'active' : ''}" 
            @click=${() => this.handleClick('home')}
          >Home</button>

          <button 
            class="${this.active === 'categories' ? 'active' : ''}" 
            @click=${() => this.handleClick('categories')}
          >Categories</button>

          <button 
            class="${this.active === 'config' ? 'active' : ''}" 
            @click=${() => this.handleClick('config')}
          >Config</button>

          <button 
            class="${this.active === 'config-addons' ? 'active' : ''}" 
            @click=${() => this.handleClick('config-addons')}
          >Config Addons</button>
        </nav>
      </aside>
    `;
  }
}
customElements.define('kodi-aside', KodiAside);
