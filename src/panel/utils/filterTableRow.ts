import { SerializedEntry } from "../consts/state";

export const filterTableRow = (entry: SerializedEntry, query: string) => {
  const tr = document.querySelector(`#tr-${entry.id}`);
  const reportTr = document.querySelector(`#report-${entry.id}`);

  if (!tr) {
    console.error(`Table row of id "tr-${entry.id}" not found`);
    return;
  }

  const isHidden = isRowHidden(entry.url, query);

  if (tr.classList.contains("hidden") && !isHidden) {
    tr.classList.remove("hidden");
  }

  if (tr.classList.contains("hidden") === false && isHidden) {
    tr.classList.add("hidden");

    if (reportTr) {
      reportTr.classList.add("hidden");
    }
  }
};

export const isRowHidden = (url: string, query: string) =>
  query.length > 2 &&
  new URL(url.toLowerCase()).href.includes(query.toLowerCase()) === false;
