interface Config {
  id?: number;
  label: string;
  errorMessage: string;
}

interface Validation {
  required: boolean;
}

export interface Control extends Config {
  validation: Validation;
  valid: boolean;
  touched: boolean;
  value: string;
}

export interface Controls {
  [question: string]: Control;
  option1: Control;
  option2: Control;
  option3: Control;
  option4: Control;
}

export function createControl(config: Config, validation: Validation): Control {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  };
}

export function validate(
  value: string,
  validation: Validation | null
): boolean {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls: Controls) {
  let isFormValid = true;

  for (const control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}

export function getKeyByValue(object: Controls, value: Control): string {
  const result = Object.keys(object).find(
    (key) => object[key].label === value.label
  );
  return result !== undefined ? result : 'false';
}
