"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {defaultDifficulty, defaultAllClues} from "../../lib/default-settings";
import getItem from "../../lib/get-item";
import CurrentRound from "../../components/current-round";
import GuessInput from "../../components/guess-input";
import Results from "../../components/results";
import Score from "../../components/score";
import buttonStyles from "../../styles/play-buttons.module.css";
import settingsStyles from "../../styles/settings.module.css";
import supabase from "../../lib/supabase";
import difficultyNumbers from "../../lib/difficulty-numbers";

export default function GamePage(){

	const difficulty = difficultyNumbers[getItem("difficulty", defaultDifficulty)];
	const allClues = JSON.parse(getItem("all-clues", defaultAllClues.toString()));

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
	const [stats, setStats] = useState({
		points: 0,
		rounds: 0,
		streak: 0
	});
	const [displayResults, setDisplayResults] = useState(false);

	const newRound = async () => {
		const results = await supabase.rpc("question", {max_difficulty: difficulty});
		const {name, video, text, map} = results.data[0];
		setCurrentRound({video, text, map, answer: name});
		setCurrentClue(allClues ? 2 : 0);
		setDisplayResults(false);
	}

	const guess = guessedLanguage => {
		if(guessedLanguage.toLowerCase() === currentRound.answer.toLowerCase()){
			const {points, rounds, streak} = stats;
			const pointAddition = 1 << (2 - currentClue);
			setLastRound({
				answer: currentRound.answer,
				guesses: [...currentGuesses, guessedLanguage],
				points: pointAddition
			});
			setStats({points: points + pointAddition, rounds: rounds + 1, streak: streak + 1});
			setCurrentClue(0);
			setCurrentGuesses([]);
			setDisplayResults(true);
		}
		else{
			if(currentClue < 2){
				setCurrentClue(currentClue + 1);
				setCurrentGuesses([...currentGuesses, guessedLanguage]);
			}
			else{
				const {points, rounds} = stats;
				setLastRound({
					answer: currentRound.answer,
					guesses: [...currentGuesses, guessedLanguage],
					points: 0
				});
				setStats({points, rounds: rounds + 1, streak: 0});
				setCurrentClue(0);
				setCurrentGuesses([]);
				setDisplayResults(true);
			}
		}
	}

	useEffect(() => {
		newRound();
	}, []);

	return <>
		<h1>lang.which</h1>
		<Score info = {stats} />
		{
			displayResults ?
				<Results lastRound = {lastRound} callback = {() => newRound()} />
			:
				currentRound.answer ?
					<>
						<GuessInput callback = {e => guess(e)} />
						<h2>clues</h2>
						<CurrentRound video = {currentRound.video} text = {currentRound.text} map = {currentRound.map} clue = {currentClue} />
					</>
				:
					<p className = {settingsStyles.description}>loading question, please wait...</p>
		}
	</>;
}