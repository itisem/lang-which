import styles from "../styles/current-round.module.css";
import ReactPlayer from "react-player/youtube";
import {useState, useEffect, useRef} from "react";

interface CurrentRoundProps{
	video: string;
	text: string;
	map: string;
	clue: number;
};

export default function CurrentRound({video, text, map, clue}: CurrentRoundProps){
	const [playing, setPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const player = useRef();

	useEffect(() => {
		setPlaying(false);
		setPlayed(0);
		setSeeking(false);
	}, [video]);

	return <div className = {styles.clues}>
		<div className = {styles.video}>
			<ReactPlayer
				ref = {player}
				url = {`https://www.youtube.com/watch?v=${video}`}
				controls = {false}
				playing = {playing}
				onProgress = {state => {
					if(!seeking) setPlayed(state.played);
				}}
			/>
		</div>
		<div className = {styles.controls}>
			<div className = {playing ? styles.pause : styles.play} onClick = {() => setPlaying(!playing)}>
			</div>
			<input
				className = {styles.slider}
				type = "range"
				min = {0}
				max = {0.999999}
				step = "any"
				value = {played}
				onMouseDown = {() => setSeeking(true)}
				onMouseUp = {e => {
					setSeeking(false);
					const value = parseFloat((e.target as HTMLInputElement).value);
					// @ts-ignore
					player.current.seekTo(value);
					setPlayed(value);
				}}
				onChange = {e => setPlayed(parseFloat((e.target as HTMLInputElement).value))}
				onEnded = {e => {
					setPlaying(false);
					setPlayed(0);
				}}
			/>
		</div>
		{clue > 0 ? <p className = {styles.text}>{text}</p> : ""}
		{clue > 1 ? <>
			<img src = {map} className = {styles.map} />
		</> : ""}
	</div>;
}