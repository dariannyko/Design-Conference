export const FORM = {
 takePartForm: document.querySelector(".take-part .form"),
 takePartName: document.querySelector(".take-part .form__name"),
 takePartCompany: document.querySelector(".take-part .form__company"),
 takePartEmail: document.querySelector(".take-part .form__email"),
 takePartTel: document.querySelector(".take-part .form__tel"),
}

export function cleanForm() {
  FORM.takePartName.value = "";
  FORM.takePartCompany.value = "";
  FORM.takePartEmail.value = "";
  FORM.takePartTel.value = "";
}