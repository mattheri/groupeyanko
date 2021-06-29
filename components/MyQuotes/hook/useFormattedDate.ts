const useFormattedDate = (millis:number) => {
  const date = new Date(millis);
  const singleToDoubleDigits = (num:number) => num < 10 ? `0${num}` : `${num}`;
  
  const day = singleToDoubleDigits(date.getDate());
  const month = singleToDoubleDigits(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default useFormattedDate;
