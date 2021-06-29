import { FC, ChangeEvent } from "react";
import Input from "./Input";

interface Props {
	onChange:(event?:ChangeEvent<HTMLInputElement>) => void;
	value:string;
	label?:string;
}

const NoValidationInput:FC<Props> = ({ onChange, value, label }) => {
	return <Input error='' hasError={false} touched={false} label={label || ''} value={value} onChange={onChange} />
}

export default NoValidationInput;
