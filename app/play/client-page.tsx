"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {defaultDifficulty, defaultAllClues} from "../../lib/default-settings";
import getItem from "../../lib/get-item";
import CurrentRound from "../../components/current-round";
import GuessInput from "../../components/guess-input";
import homeStyles from "../../styles/homepage.module.css";
import settingsStyles from "../../styles/settings.module.css";
import supabase from "../../lib/supabase";
import difficultyNumbers from "../../lib/difficulty-numbers";

export default function GamePage(){

	const difficulty = difficultyNumbers[getItem("difficulty", defaultDifficulty)];
	const allClues = JSON.parse(getItem("all-clues", defaultAllClues.toString()));
	const storedStats = JSON.parse(getItem("stats", "{}"));

	const [currentRound, setCurrentRound] = useState({
		answer: "",
		video: "",
		text: "",
		map: ""
	});
	const [currentGuesses, setCurrentGuesses] = useState([]);
	const [lastRound, setLastRound] = useState({
		answer: "",
		guesses: [],
		points: 0
	});
	const [currentClue, setCurrentClue] = useState(0);

	const newRound = async () => {
		const results = await supabase.rpc("question", {max_difficulty: difficulty});
		const {name, video, text, map} = results.data[0];
		setCurrentRound({video, text, map, answer: name});
		setCurrentClue(allClues ? 2 : 0);
	}

	const guess = guessedLanguage => {
		if(guessedLanguage.toLowerCase() === currentRound.answer.toLowerCase()){
			setLastRound({
				answer: currentRound.answer,
				guesses: currentGuesses,
				points: 1 << (2 - currentClue)
			});
			setCurrentClue(0);
			setCurrentGuesses([]);
			newRound();
		}
		else{
			if(currentClue < 2){
				setCurrentClue(currentClue + 1);
				setCurrentGuesses([...currentGuesses, guess]);
			}
			else{
				setLastRound({
					answer: currentRound.answer,
					guesses: [...currentGuesses, guess],
					points: 0
				});
				setCurrentClue(0);
				setCurrentGuesses([]);
				newRound();
			}
		}
	}

	useEffect(() => {
		newRound();
	}, []);

	return <>
		<h1>lang.which</h1>
		{
			currentRound.answer ? 
			<>
				<GuessInput callback = {e => guess(e)} />
				<h2>clues</h2>
				<CurrentRound video = {currentRound.video} text = {currentRound.text} map = {currentRound.map} clue = {currentClue} />
			</>
			:
			<p className = {settingsStyles.description}>loading question, please wait...</p>
		}
		<div className = {homeStyles.buttons}>
			<Link className = {homeStyles.play} href = "/settings">
				settings
			</Link>
		</div>
	</>;
}