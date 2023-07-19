"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import RadioButtonGroup from "../../components/radio-button-group";
import styles from "../../styles/settings.module.css";
import {defaultDifficulty, defaultAllClues} from "../../lib/default-settings";
import getItem from "../../lib/get-item";
import homeStyles from "../../styles/homepage.module.css";
import difficultyNumbers from "../../lib/difficulty-numbers";

const difficultyButtons = Object.keys(difficultyNumbers).map(value => ({value}));
const allCluesButtons = [
	{value: "on"},
	{value: "off"}
];

export default function SettingsPage(){
	// difficulty settings
	const baseDifficulty = getItem("difficulty", defaultDifficulty);
	const baseAllClues = JSON.parse(getItem("all-clues", defaultAllClues.toString()));
	const [difficulty, setDifficulty] = useState(baseDifficulty);

	const saveDifficulty = newDifficulty => {
		localStorage.setItem("difficulty", newDifficulty);
		setDifficulty(newDifficulty);
	}

	const saveAllClues = newAllClues => {
		const boolAllclues = newAllClues === "on";
		localStorage.setItem("all-clues", JSON.stringify(boolAllclues));
	}

	return <>
		<h1>settings</h1>
		<section className = {styles.settings}>
			<section className = {styles.individual}>
				difficulty: 
				<RadioButtonGroup
					buttons = {difficultyButtons}
					name = "difficulty"
					defaultValue = {baseDifficulty}
					callback = {saveDifficulty}
				/>
				<ul className = {styles.description}>
					<li>
						<u>easy</u> mode includes official national languages spoken by at least 50 million speakers.
					</li>
					<li>
						<u>medium</u> includes any official national language, as well as minority languages with at least 5 million speakers.
					</li>
					<li>
						<u>hard</u> includes any language with at least 100k speakers.
					</li>
					<li>
						<u>extreme</u> includes any language with a submitted clip.
					</li>
				</ul>
			</section>
			<section className = {styles.individual}>
				show all clues at once:
				<RadioButtonGroup
					buttons = {allCluesButtons}
					name = "show-all"
					defaultValue = {baseAllClues ? "on" : "off"}
					callback = {saveAllClues}
				/>
				<p className = {styles.description}>makes the game easier, but decreases your score.</p>
			</section>
			<section className = {homeStyles.buttons}>
				<Link className = {homeStyles.play} href = "/play">
					play now
				</Link>
			</section>
		</section>
	</>
}