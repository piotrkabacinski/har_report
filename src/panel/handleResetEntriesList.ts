import { state } from "./state";
import { ElementSelector } from "@/consts/ElementSelector";
import { setEntriesAmount } from "./setEntriesAmount";

export const handleResetEntriesList = () => {
  state.entries.length = 0;

  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  if (!tbody) throw `${ElementSelector.table} element not found`;

  tbody.innerHTML = "";

  setEntriesAmount(0);
}
