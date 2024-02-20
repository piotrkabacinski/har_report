export const handleFormSubmit = (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();

  const form = document.querySelector<HTMLFormElement>("form");

  if (!form) throw `Form element not found`;

  const isValid = form.checkValidity();

  if (!isValid) {
    form.reportValidity();
    return;
  }

  console.log("submit...");
};
