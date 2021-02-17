import React from "react";

type Validation = {
  pattern?: RegExp;
  message: string;
  other?: (value: string) => boolean;
}[];

type UseFormReturn<T> = {
  errors: T;
  handleChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

export function useForm<T>(
  validation: { [key: string]: Validation },
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>
): UseFormReturn<T> {
  const data = (Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, (value = "")])
  ) as unknown) as T;
  const [formErrors, setFormErrors] = React.useState<T>(data);

  const handleError = (
    validation: {
      [key: string]: Validation;
    },
    value: string,
    id: string
  ) => {
    validation[`${id}`]?.map((patterns) => {
      if (patterns.pattern && !patterns.pattern.test(value)) {
        return setFormErrors((errors) =>
          Object.assign({}, errors, {
            [`${id}`]: patterns.message,
          })
        );
      } else {
        setFormErrors((errors) =>
          Object.assign({}, errors, {
            [`${id}`]: "",
          })
        );
      }

      if (patterns.other && !patterns.other(value)) {
        return setFormErrors((errors) =>
          Object.assign({}, errors, {
            [`${id}`]: patterns.message,
          })
        );
      } else {
        setFormErrors((errors) =>
          Object.assign({}, errors, {
            [`${id}`]: "",
          })
        );
      }
    });

    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const id = e.target.id;
    const value = handleError(validation, e.target.value, id);

    setFormData((data) =>
      Object.assign({}, data, {
        [`${id}`]: value,
      })
    );
  };

  return {
    errors: formErrors,
    handleChange,
  };
}
