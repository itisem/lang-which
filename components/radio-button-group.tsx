import styles from "../styles/radio-button-group.module.css";
import {useState, useEffect} from "react";

export interface RadioButtonGroupProps{
	buttons: Button[];
	defaultValue: string;
	name: string;
	callback?: Function;
};

export interface Button{
	value: string | number;
	label?: string | number;
}

const defaultCallback = x => x;

export default function RadioButtonGroup({buttons, defaultValue, callback, name}: RadioButtonGroupProps){
	const [value, setValue] = useState(defaultValue);
	callback = callback ?? defaultCallback;
	useEffect(() => setValue(defaultValue), [defaultValue]);
	return <>{
		buttons.map(x => 
			<div className = {styles.button} key={x.value}>
				<input
					type = "radio"
					name = {name}
					value = {x.value}
					id = {`button-${name}-${x.value}`}
					checked = {x.value === value}
					onChange = {e => {
						const newValue = (e.target as HTMLInputElement).value;
						setValue(newValue);
						callback(newValue);
					}}
				/>
				<label htmlFor={`button-${name}-${x.value}`}>{x.label ?? x.value}</label>
			</div>
		)
	}</>
}