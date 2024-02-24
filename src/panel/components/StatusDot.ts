{
  enum Attribute {
    isRecording = "is-recording",
  }

  class StatusDot extends HTMLElement {
    private isRecording = false;

    constructor() {
      super();
    }

    connectedCallback() {
      this.isRecording = this.getAttribute(Attribute.isRecording) == "true";
      this.createTemplate();
    }

    static get observedAttributes() {
      return [Attribute.isRecording];
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
      switch (name) {
        case Attribute.isRecording:
          this.isRecording = newValue === "true";
          this.createTemplate();
          break;
      }
    }

    private createTemplate() {
      this.innerHTML = `
        <div
          class="status-dot ${this.isRecording ? "status-dot--recording" : ""}"
        ></div>
      `;
    }
  }

  customElements.define("status-dot", StatusDot);
}
