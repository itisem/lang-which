import Link from "next/link";

export default function AboutPage(){
	return <>
		<h1>about</h1>

		<p>
			lang.which is a game about guessing languages. you receive up to 3 clues per round - one audio-based, one text-based, and the area in which the language is spoken. you have to guess the language. it is that simple.
		</p>
		<p>
			if you guess it just from listening, you receive 4 points. if you need text, you receive 2, and if you need the map, you get 1. that said, points don&apos;t matter, since everything is just for fun anyway :)
		</p>
		<p>
			this website was made by <a href = "https://emily.bz">emily nagy</a>. if you like what you see here, please consider getting in touch and hiring me!
		</p>

		<h2>faq</h2>

		<h3>sources</h3>

		<details>
			<summary>
				where are all the text snippets sourced from?
			</summary>
			<p>
				the vast majority of text snippets are sourced from various wikipedia articles in their respective local languages.
			</p>
		</details>
		<details>
			<summary>
				where are all the audio snippets sourced from?
			</summary>
			<p>
				all audio is user-submitted, and is embedded directly from youtube. once you finish a round, the link to the video is shown in the summary. in particular, many videos come from <a href = "https://www.youtube.com/@Wikitongues">wikitongues</a>.
			</p>
		</details>
		<details>
			<summary>
				what technology is the website built with?
			</summary>
			<p>
				the website was built with next.js & typescript, while the database is postgresql, running on supabase. i also use the following open-source libraries: flexsearch, react-player.
			</p>
		</details>

		<h3>languages</h3>

		<details>
			<summary>
				how many languages are included?
			</summary>
			<p>
				the number constantly changes. visit the <Link href = "/statistics">statistics</Link> page for up-to-date information.
			</p>
		</details>
		<details>
			<summary>
				what makes a certain language easy / hard?
			</summary>
			<p>
				in order to avoid bias, i use set-in-stone criteria to determine the difficulty of a language:
			</p>
			<ul>
				<li>
					<i>easy</i> difficulty includes languages that have an official status in at least one country, and 50 million speakers (including both native and second-language speakers).
				</li>
				<li>
					<i>medium</i> difficulty has every language with an official status, or at least 5 million speakers.
				</li>
				<li>
					<i>hard</i> difficulty can include anything with over 100 thousand speakers.
				</li>
				<li>
					<i>extreme</i> difficulty can include absolutely anything.
				</li>
			</ul>
			<p>
				this means that you will likely encounter some classifications that feel wrong to you. for example, if you live in the netherlands (like i do), you may find west frisian (hard difficulty) easier to recognise than amharic (easy difficulty). that said, i think you will generally agree with most classifications, and i think that this solution is ideal to avoid having a western bias.
			</p>
		</details>
		<details>
			<summary>
				what counts as a language?
			</summary>
			<p>
				i generally use the approach of &quot;if many people call it a language, it&apos;s a language&quot;. for example, serbian and croatian are considered separate languages, since their governments and population say so, even though most linguists would call them a dialect of serbo-croat; low saxon is considered a language, even though many people would call it a gronings dialect of dutch or the niederdeutsch dialect of german; ligurian is considered a language despite italy&apos;s continued approach to delegitimise its use as by calling it a dialect. 
			</p>
		</details>
		<details>
			<summary>
				how do you decide what to call each language?
			</summary>
			<p>
				whatever seems to be the most commonly used name in literature.
			</p>
		</details>

		<h3>clues</h3>

		<details>
			<summary>
				why do certain clues appear so frequently?
			</summary>
			<p>
				the short and simple answer is that it is much easier to find videos and written samples for some languages. i have made the intentional decision to make each language appear at the same frequency, in order to prevent things like every other round being, say, spanish.
			</p>
		</details>
		<details>
			<summary>
				why are certain snippets so short?
			</summary>
			<p>
				i try my best to avoid short snippets, but it can be quite hard at times. particularly, certain languages that have been historically oppressed lack a strong written tradition, making it quite hard to find good text snippets for them. for less-spoken languages, finding audio can also be quite hard.
			</p>
		</details>
		<details>
			<summary>
				why do certain snippets include the language name?
			</summary>
			<p>
				once again, it comes down to ease of finding examples. i would like to have perfect snippets for everything, but for many languages, there is very little material available. my general approach is that bad snippets are better than no snippets, so i will use ones that are easy if necessary.
			</p>
		</details>
	</>	
}

export const metadata = {
	title: "about | lang.which"
};