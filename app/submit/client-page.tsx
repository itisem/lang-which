"use client";

import styles from "../../styles/submit.module.css";
import {useState} from "react";

export default function Submit(){
	const [clueType, setClueType] = useState("audio");
	const [language, setLanguage] = useState("");
	const [clue, setClue] = useState("");

	const submit = () => {
		console.log(clueType, language, clue);
	}

	return <div className = {styles.page}>
		<p> 
			<input
				type = "radio" name = "clue-type" id = "clue-type-audio"
				value = "audio" className = {styles.select} defaultChecked
				onChange = {e => setClueType(e.target.value)}
			 />
			<label htmlFor = "clue-type-audio" className = {styles.label}>audio</label>
			&nbsp;
			<input
				type = "radio" name = "clue-type" id = "clue-type-text"
				value = "video" className = {styles.select}
				onChange = {e => setClueType(e.target.value)}
			/>
			<label htmlFor = "clue-type-text" className = {styles.label}>text</label>
		</p>
		<p >
			<input
				type = "text" id = "language"
				placeholder = "language" className = {styles.text}
				onChange = {e => setLanguage(e.target.value)}
			/>
		</p>
		<p>
			<textarea
				id = "clue" rows = {5} cols = {40}
				placeholder = "enter your clue here" className = {styles.text}
				onChange = {e => setClue(e.target.value)}
			>
			</textarea>
		</p>
		<p>
			<button className = {styles.submit} onClick = {submit}>
				submit
			</button>
		</p>
		<p>
			if you are submitting an audio clue, please submit a youtube video url!
		</p>
	</div>
}