"use client";

import styles from "../../styles/submit.module.css";
import {useState} from "react";
import getYoutubeID from "get-youtube-id";
import supabase from "../../lib/supabase";

export default function Submit(){
	const [clueType, setClueType] = useState("audio");
	const [language, setLanguage] = useState("");
	const [clue, setClue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [errored, setErrored] = useState(false);

	const error = (message) => {
		setErrored(true);
		setErrorMessage(message);
	}

	const submit = () => {
		setErrorMessage("");
		setErrored(false);
		const realClue = clueType === "audio" ? getYoutubeID(clue) : clue;
		// clue type should always be specified. adding this sanity check, but it should never ever occur
		if(!clueType) return error("error: no clue type specified. this was not meant to happen");
		if(!language) return error("error: no language specified.");
		// getYoutubeID returns null if it's not a youtube url, and an id if it is
		if(realClue === null) return error("error: audio link is not a youtube video url.");
		// empty string means text clue w/o a value
		if(realClue === "") return error("error: unspecified text clue.");

		supabase.from("suggestions").insert({
			language,
			clue: clueType,
			value: realClue
		}).then(() =>{
			setErrorMessage(`successfully submitted a clue for the ${language} language.`);
			setClue("");
			setLanguage("");
			resolve(true);
		}).catch(
			() => error("database error while submitting, please try again later.")
		)
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
				value = {language}
			/>
		</p>
		<p>
			<textarea
				id = "clue" rows = {5} cols = {40}
				placeholder = "enter your clue here" className = {styles.text}
				onChange = {e => setClue(e.target.value)}
				value = {clue}
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
		<p className = {errored ? styles.error : styles.feedback}>
			{errorMessage}
		</p>
	</div>
}