{
  enum Attribute {
    status = "status",
  }

  enum ColorClass {
    green = "success",
    yellow = "redirect",
    red = "fail",
  }

  const getStatusClass = (status: number): string => {
    if (status < 200) return "";

    if (status < 300) return ColorClass.green;

    if (status < 400) return ColorClass.yellow;

    return ColorClass.red;
  };

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
