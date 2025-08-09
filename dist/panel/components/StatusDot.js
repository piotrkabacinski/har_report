import { StatusDotAttribute as Attribute } from "../consts/StatusDotAttribute";
import { ElementSelector } from "@/consts/ElementSelector";
{
    class StatusDot extends HTMLElement {
        isRecording = false;
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
        attributeChangedCallback(name, _, newValue) {
            switch (name) {
                case Attribute.isRecording:
                    this.isRecording = newValue === "true";
                    this.createTemplate();
                    break;
            }
        }
        createTemplate() {
            this.innerHTML = `
        <div
          class="status-dot ${this.isRecording ? "status-dot--recording" : ""}"
        ></div>
      `;
        }
    }
    customElements.define(ElementSelector.statusDot, StatusDot);
}
