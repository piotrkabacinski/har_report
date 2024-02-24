import { getStatusClass } from "../getStatusClass";

{
  enum Attribute {
    status = "status",
  }

  class ResponseStatus extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const status = this.getAttribute(Attribute.status);

      this.innerHTML = `
        <span class="status ${
          status !== null ? getStatusClass(Number(status)) : ""
        }">
          ${status}
        </span>
      `;
    }
  }

  customElements.define("response-status", ResponseStatus);
}
