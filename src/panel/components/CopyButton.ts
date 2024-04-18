import { writeToClipboard } from "../utils/writeToClipboard";

{
  enum Attribute {
    targetSelector = "target-selector",
  }

  class CopyButton extends HTMLElement {
    constructor() {
      super();
    }

    createTemplate() {
      this.innerHTML = `
        <button type="button" class="copy">
          Copy
        </button>
      `;
    }

    async copyAction(e: MouseEvent) {
      const targetSelector = this.getAttribute(Attribute.targetSelector);

      if (!targetSelector) throw `No target selector provided`;

      const sourceElement = document.querySelector<HTMLElement>(targetSelector);

      if (!sourceElement)
        throw `No target element for ${targetSelector} selector`;

      const content = sourceElement.innerText;

      const button = e.target as HTMLButtonElement;

      try {
        await writeToClipboard(content);

        if (!e.target) return;

        button.innerText = "Copied!";
        button.setAttribute("disabled", "true");

        setTimeout(() => {
          button.innerText = "Copy";
          button.removeAttribute("disabled");
        }, 750);
      } catch (err) {
        console.error(err);
      }
    }

    appendEvents() {
      const button = this.querySelector<HTMLButtonElement>("button");

      if (!button) throw `No button element found`;

      button.addEventListener("click", this.copyAction.bind(this));
    }

    removeEvents() {
      const button = this.querySelector<HTMLButtonElement>("button");

      if (!button) return;

      this.querySelector<HTMLButtonElement>("button").removeEventListener(
        "click",
        this.copyAction
      );
    }

    connectedCallback() {
      this.createTemplate();
      this.appendEvents();
    }

    disconnectedCallback() {
      this.removeEvents();
    }
  }

  customElements.define("copy-button", CopyButton);
}
