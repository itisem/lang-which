import styles from "../styles/score.module.css";

interface ScoreProps{
	info: {
		points: number;
		rounds: number;
		streak: number;
	};
};

export default function Score({info}: ScoreProps){
	return <>
		<h3 className = {styles.streak}>streak: {info.streak}</h3>
		<h3 className = {styles.score}>score: {info.points} / <span className = {styles.small}>{info.rounds * 4}</span></h3>
	</>
}