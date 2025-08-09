import { getStatusClass } from "../utils/getStatusClass";
{
    let Attribute;
    (function (Attribute) {
        Attribute["status"] = "status";
    })(Attribute || (Attribute = {}));
    class ResponseStatus extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            const status = this.getAttribute(Attribute.status);
            this.innerHTML = `
        <span class="status ${status !== null ? getStatusClass(Number(status)) : ""}">
          ${status}
        </span>
      `;
        }
    }
    customElements.define("response-status", ResponseStatus);
}
