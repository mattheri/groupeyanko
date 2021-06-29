const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^.*(?=.*[A-Za-z])(?=.*\d)[-_$!@#%^&\*.A-Za-z\d]{8,}$/,
  postalCode: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  phoneNumber: /^[\d{1,2}\s]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
}

export default regex;
