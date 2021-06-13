export const hasErrors = (
  formData: { [key: string]: string },
  errors: { [key: string]: string },
  fieldsToIgnore: string[] = []
) => {
  return () => {
    const keys = Object
    .keys(formData)
    .filter(
      (key) => fieldsToIgnore.every(
        (k) => k !== key
      )
    );
        
    const hasNoValues = keys.every((key) => formData[key].length === 0);
    const condition = Object.values(errors).length || hasNoValues;

    if (condition) {
      return true;
    }

    return false;
  };
};
