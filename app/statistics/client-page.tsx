"use client";

import {useState, useEffect} from "react";
import supabase from "../../lib/supabase";
import settingsStyles from "../../styles/settings.module.css";
import styles from "../../styles/statistics.module.css";
import difficultyNumbers from "../../lib/difficulty-numbers";

interface StatisticsInput{
	difficulty: number;
	total: number;
};

// not very efficient, but does the job fine enough
const sumDifficulties = (input: StatisticsInput[]) => Object.fromEntries(
	Object.entries(difficultyNumbers).map(([text, difficulty]) => [
		text,
		input.filter(x => x.difficulty <= difficulty).reduce((x, y) => x + y.total, 0)
	])
);

export default function LanguageStatistics(){
	const [videoStatistics, setVideoStatistics] = useState({});
	const [textStatistics, setTextStatistics] = useState({});
	const [languageStatistics, setLanguageStatistics] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const languagesPromise = supabase.rpc("language_statistics").then(
			x => setLanguageStatistics(sumDifficulties(x.data))
		);
		const videosPromise = supabase.rpc("video_statistics").then(
			x => setVideoStatistics(sumDifficulties(x.data))
		);
		const textsPromise = supabase.rpc("text_statistics").then(
			x => setTextStatistics(sumDifficulties(x.data))
		);
		Promise.allSettled([languagesPromise, videosPromise, textsPromise]).then(() => {
			setLoading(false)
		});
	}, []);

	if(loading) return <>
		<h1>statistics</h1>
		<p className = {settingsStyles.description}>
			loading statistics, please wait...
		</p>
	</>

	return <>
		<h1>statistics</h1>
		<table className = {styles.statistics}>
			<tbody>
				<tr>
					<th>difficulty</th>
					<th>languages</th>
					<th>videos</th>
					<th>texts</th>
				</tr>
				{
					Object.keys(difficultyNumbers).map(name => 
						<tr key = {name}>
							<th>{name}</th>
							<td>{languageStatistics[name]}</td>
							<td>{videoStatistics[name]}</td>
							<td>{textStatistics[name]}</td>
						</tr>
					)
				}
			</tbody>
		</table>
	</>
}

