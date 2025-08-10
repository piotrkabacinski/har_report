import { ElementSelector } from "@/consts/ElementSelector";
import { state } from "../consts/state";
import { filterTableRow } from "./filterTableRow";

export const appendFiltersListener = (): void => {
  const filterInput = document.querySelector<HTMLInputElement>(
    ElementSelector.filter,
  );

  if (!filterInput) {
    throw `${ElementSelector.filter} selector not found`;
  }

  filterInput.addEventListener("input", (event) => {
    const { value } = event.target as HTMLInputElement;
    state.filter = value.trim();
    filterTrIds();
  });
};

const filterTrIds = () => {
  for (const entry of state.entries) {
    filterTableRow(entry, state.filter);
  }
};
