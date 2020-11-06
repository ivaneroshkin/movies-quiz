interface Config {
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
  question: Control;
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
