import { useState, useEffect } from "react";

export function usePersistedForm(formKey: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getValue = (name: string) =>
    localStorage.getItem(`@${formKey}-form-${name}`) || "";

  const [values, setValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedValues: { [key: string]: string } = {};
    for (const key in localStorage) {
      if (key.startsWith(`@${formKey}-form-`)) {
        const fieldName = key.replace(`@${formKey}-form-`, "");
        storedValues[fieldName] = localStorage.getItem(key) || "";
      }
    }
    setValues(storedValues);
  }, [formKey]);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    localStorage.setItem(`@${formKey}-form-${name}`, value);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const clearFormStorage = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`@${formKey}-form-`)) {
        localStorage.removeItem(key);
      }
    });
    setValues({});
  };

  return { values, handleChange, clearFormStorage };
}
