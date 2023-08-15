import styles from "../styles/results.module.css";
import playStyles from "../styles/play-buttons.module.css";
import Link from "next/link";

interface ResultsProps{
	lastRound: {
		answer: string;
		guesses: string[];
		points: number;
	};
	callback: () => void;
}

export default function Results({lastRound, callback}: ResultsProps){
	return <section className = {lastRound.points ? styles.correct : styles.incorrect}>
		<p>
			<span className = {styles.highlight}> {lastRound.points ? "correct" : "incorrect"}! </span> the answer was <span className = {styles.highlight}>{lastRound.answer}</span>.
		</p>
		<p>
			you guessed {lastRound.guesses.join(", ")} and earnt <span className = {styles.highlight}>{lastRound.points}</span> points.
		</p>
		<section className = {playStyles.buttons}>
			<button className = {playStyles.play} onClick = {callback}>
				next round
			</button>
			<span className = {playStyles.or}>
				or
			</span>
			<Link className = {playStyles.settings} href = "/settings">
				settings
			</Link>
		</section>
	</section>
}