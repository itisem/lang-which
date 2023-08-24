import styles from "../styles/guess-input.module.css";
import {useEffect, useState, useMemo} from "react";
import {Index} from "flexsearch";
import supabase from "../lib/supabase";
import getItem from "../lib/get-item";
import {defaultDifficulty} from "../lib/default-settings";
import difficultyNumbers from "../lib/difficulty-numbers";
import Draggable from "./draggable";

interface GuessInputProps{
	callback: (guess: string) => void;
};

export default function GuessInput({callback}: GuessInputProps){
	const difficulty = difficultyNumbers[getItem("difficulty", defaultDifficulty)];
	// @ts-ignore
	const index = useMemo(() => new Index({tokenize: "full"}), []);
	const [searchText, setSearchText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const search = text => {
		const results = index.search(text);
		setSuggestions(results);
	}

	const availableLanguages = useEffect(() => {
		const getLanguages = async() => {
			const results = await supabase.rpc("languages", {max_difficulty: difficulty});
			results.data.forEach(language => index.add(language, language));
		}
		getLanguages();
	}, []);

	return <>
		<div className = {styles.guessbox}>
			<input
				type = "text"
				onKeyDown = {e => {
					if(e.keyCode === 13){
						callback((e.target as HTMLInputElement).value);
						setSearchText("");
					}
				}}
				onChange = {e => {
					const value = (e.target as HTMLInputElement).value;
					setSearchText(value);
					search(value);
				}}
				className = {styles.guess}
				value = {searchText}
			/>
		</div>
		<div className = {styles.suggested}>
			{searchText === "" ? <i>start typing to get suggested languages</i> :
				suggestions.length > 0 ?
					<>
						<span className = {styles.label}>suggested:</span>
						<Draggable>
							{suggestions.map(suggestion => <>
								<div
									key = {suggestion}
									onClick = {() => {
										setSearchText("");
										callback(suggestion);
									}}
									className = {styles.individual}
								>
									{suggestion}
								</div>
							</>)}
						</Draggable>
					</>
					: <i>no matching language found</i>
			}
		</div>
	</>
}