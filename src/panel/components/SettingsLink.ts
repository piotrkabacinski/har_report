{
  class SettingsLink extends HTMLElement {
    private href = `chrome-extension://${chrome.runtime.id}/settings.html`;

    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
        ⚙️
        <a href="${this.href}" target="_blank" class="link">
          Settings
        </a>
      `;
    }
  }

  customElements.define("settings-link", SettingsLink);
}
