import { set, get, remove, clear as c } from 'local-storage';

const useLocalStorage = () => {
  const setItem = <T>(key:string, data:T) => set(key, JSON.stringify(data));
  const getItem = (key:string) => JSON.parse(get(key));
  const removeItem = (key:string) => remove(key);
  const clear = () => c();

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}

export default useLocalStorage;
