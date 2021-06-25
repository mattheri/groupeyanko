import { useState, useEffect } from 'react';

const useDebouncedValue = (value:string, delay:number) => {
	const [debouncedValue, setDebouncedValue] = useState('');

	useEffect(() => {
		let timer:NodeJS.Timeout;

		const clear = () => clearTimeout(timer);

		while (!timer) {
			timer = setTimeout(() => {
				setDebouncedValue(value);
				clear();
			}, delay);
		}

		return () => clear();
	}, [value]);

	return debouncedValue;
}

export default useDebouncedValue;
