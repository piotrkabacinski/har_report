import { appendClickListener } from "@/utils/appendClickListener";
export const appendEndpointButton = (entry) => {
    const td = document.querySelector(`#button-${entry.id}`);
    if (!td)
        throw `Cell for button not found: "#button-${entry.id}"`;
    const button = document.createElement("button");
    const url = new URL(entry.url);
    button.classList.add("href-button");
    button.innerText = url.pathname;
    td.appendChild(button);
    const reportTr = document.querySelector(`#report-${entry.id}`);
    if (!reportTr)
        throw `Report tr not found: "#report-${entry.id}"`;
    const callback = () => {
        reportTr.classList.toggle("hidden");
    };
    appendClickListener(`#button-${entry.id} button.href-button`, callback);
};
