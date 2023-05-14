export const appendEndpointButton = (index: number, url: URL): void => {
  const button = document.createElement("button");

  button.classList.add("href-button");
  button.setAttribute("data-index", index.toString());
  button.innerText = url.href.replace(url.origin, "");

  button.addEventListener("click", (e: PointerEvent) => {
    const index = (e.target as HTMLButtonElement).dataset.index;

    const reportTd = document.querySelector(`#report-${index}`);

    if (!reportTd) throw `Report td not found: "#report-${index}"`;

    reportTd.classList.toggle("hidden");
  });

  const td = document.querySelector<HTMLTableCellElement>(`#button-${index}`);

  if (!td) throw `Button not found: "#button-${index}"`;

  td.appendChild(button);
};
