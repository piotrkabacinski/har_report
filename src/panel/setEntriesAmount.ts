import { setElementText } from "../utils/setElementText";
import { ElementSelector } from "../consts/ElementSelector";

export const setEntriesAmount = (amount: number): void => {
  setElementText(ElementSelector.status, `Entries: ${amount}`);
}
