import { state } from "../consts/state";
import { ElementSelector } from "@/consts/ElementSelector";

export const handleResetEntriesList = () => {
  const isConfirmed = confirm("Are you sure to clean up the entire list?");

  if (!isConfirmed) return;

  state.entries.length = 0;

  const tbody = document.querySelector(`${ElementSelector.table} tbody`);

  if (!tbody) throw `${ElementSelector.table} element not found`;

  tbody.innerHTML = "";
};
