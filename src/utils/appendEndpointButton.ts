export const appendEndpointButton = (index: number, url: URL): void => {
  const button = document.createElement("button");

  button.classList.add("href-button");
  button.setAttribute("data-index", index.toString());
  button.innerText = url.href.replace(url.origin, "");

  button.addEventListener("click", (e) => {
    console.log(e);
  });

  const td = document.querySelector<HTMLTableCellElement>(`#button-${index}`);

  if (!td) throw `Button not found: "#button-${index}"`;

  td.appendChild(button);
};
