import { LitElement, html, css } from 'lit';

// Claves de localStorage
const LS_KEYS = {
    IP: 'kodiIp',
    USER: 'kodiUser',
    PASS: 'kodiPass',
    PREFERRED_AUDIO: 'preferredAudio',
    SECONDARY_AUDIO: 'secondaryAudio'
};

export class KodiConfig extends LitElement {
    static properties = {
        kodiIp: { type: String },
        username: { type: String },
        password: { type: String },
        preferredAudio: { type: String },
        secondaryAudio: { type: String },
        statusMessage: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        h2 {
            color: var(--color-primary, #4CAF50);
            border-bottom: 2px solid var(--color-border, #ccc);
            padding-bottom: 10px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--color-border, #ccc);
            border-radius: 4px;
            box-sizing: border-box;
            background-color: var(--color-input-bg, #f9f9f9);
        }
        button {
            padding: 10px 15px;
            background-color: var(--color-primary, #4CAF50);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background-color: var(--color-primary-dark, #45a049);
        }
        .status {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
            background-color: var(--color-info-bg, #e0f7fa);
            color: var(--color-info, #00796b);
        }
    `;

    constructor() {
        super();
        this.loadConfig();
        this.statusMessage = '';
    }

    // Carga la configuración desde localStorage
    loadConfig() {
        this.kodiIp = localStorage.getItem(LS_KEYS.IP) || '192.168.0.14:8080';
        // NOTA: No cargamos la contraseña directamente para evitar mostrarla
        this.username = localStorage.getItem(LS_KEYS.USER) || 'kodi';
        this.preferredAudio = localStorage.getItem(LS_KEYS.PREFERRED_AUDIO) || 'es';
        this.secondaryAudio = localStorage.getItem(LS_KEYS.SECONDARY_AUDIO) || 'en';
        // Cargamos la contraseña en memoria, pero no la mostramos en el campo de texto
        this.password = localStorage.getItem(LS_KEYS.PASS) || '1234';
    }

    // Maneja el guardado de la configuración
    saveConfig(e) {
        e.preventDefault();
        const form = e.target;
        
        // Asume que los inputs tienen el atributo 'name'
        const newIp = form.querySelector('[name="kodi-ip"]').value.trim();
        const newUsername = form.querySelector('[name="username"]').value.trim();
        const newPassword = form.querySelector('[name="password"]').value;
        const newPreferred = form.querySelector('[name="preferred-audio"]').value.trim().toLowerCase();
        const newSecondary = form.querySelector('[name="secondary-audio"]').value.trim().toLowerCase();

        // Guardar en localStorage
        localStorage.setItem(LS_KEYS.IP, newIp);
        localStorage.setItem(LS_KEYS.USER, newUsername);
        localStorage.setItem(LS_KEYS.PASS, newPassword); 
        localStorage.setItem(LS_KEYS.PREFERRED_AUDIO, newPreferred);
        localStorage.setItem(LS_KEYS.SECONDARY_AUDIO, newSecondary);
        
        // Actualizar el estado del componente
        this.kodiIp = newIp;
        this.username = newUsername;
        this.password = newPassword; // Lo actualizamos en memoria
        this.preferredAudio = newPreferred;
        this.secondaryAudio = newSecondary;

        this.statusMessage = '✅ Configuración guardada correctamente.';
        
        // Disparar un evento para notificar al resto de la app (ej: kodi-main)
        this.dispatchEvent(new CustomEvent('kodi-config-updated', { bubbles: true, composed: true }));
    }

    render() {
        return html`
            <h2>Configuración de Conexión Kodi</h2>
            <form @submit=${this.saveConfig}>
                <div class="form-group">
                    <label for="kodi-ip">IP y Puerto (ej: 192.168.1.10:8080)</label>
                    <input type="text" id="kodi-ip" name="kodi-ip" .value=${this.kodiIp} required>
                </div>
                
                <div class="form-group">
                    <label for="username">Usuario RPC</label>
                    <input type="text" id="username" name="username" .value=${this.username}>
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña RPC</label>
                    <input type="password" id="password" name="password" value=${this.password} placeholder="Dejar vacío para mantener la actual">
                </div>

                <div class="form-group">
                    <label for="preferred-audio">Idioma Preferido (ej: es, eng)</label>
                    <input type="text" id="preferred-audio" name="preferred-audio" .value=${this.preferredAudio}>
                </div>
                
                <div class="form-group">
                    <label for="secondary-audio">Idioma Secundario (ej: en, fra)</label>
                    <input type="text" id="secondary-audio" name="secondary-audio" .value=${this.secondaryAudio}>
                </div>
                
                <button type="submit">💾 Guardar Configuración</button>
            </form>
            
            ${this.statusMessage ? html`<div class="status">${this.statusMessage}</div>` : ''}
        `;
    }
}
customElements.define('kodi-config', KodiConfig);