import Head from "next/head";
import Link from "next/link";
import styles from "../styles/homepage.module.css";

export default function Homepage(){
	return <>
		<h1>lang.which</h1>
		<p className = {styles.description}>
			<b className = "highlight">lang.which</b> is a game in which you guess languages based on audio and text snippets, maps and more!
			you receive up to 3 clues per round, with each clue resulting in fewer points.
			how many of them can you get right?
		</p>
		<div className = {styles.buttons}>
			<Link className = {styles.play} href = "/play">
				play now
			</Link>
			<span className = {styles.or}>
				or
			</span>
			<Link className = {styles.settings} href = "/settings">
				settings
			</Link>
		</div>
	</>;
}

export const metadata = {
	title: "lang.which - the language guessing game",
	description: "lang.which is a language guessing game with audio and text snippets, maps and more!"
};