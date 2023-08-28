import "../styles/global.css";
import styles from "../styles/layout.module.css";
import type {ReactNode} from "react";
import Link from "next/link";

interface LayoutProps{
	children: ReactNode;
};

export default function Layout({children}: LayoutProps){
	return <html lang = "en">
		<body>
			<header className = {styles.header}>
				<input type = "checkbox" id = "menu-toggle" className = {styles.checkbox} />
				<label htmlFor = "menu-toggle" className = {styles.lines}>
					<span className = {styles.line1}></span>
					<span className = {styles.line2}></span>
					<span className = {styles.line3}></span>
				</label>
				<menu className = {styles.menu}>
					<li>
						<Link href = "/"><b>lang.which</b></Link>
					</li>
					<li>
						<Link href = "/play">play</Link>
					</li>
					<li>
						<Link href = "/settings">settings</Link>
					</li>
					<li>
						<Link href = "/submit">submit</Link>
					</li>
					<li>
						<Link href = "/statistics">statistics</Link>
					</li>
					<li>
						<Link href = "/about">about</Link>
					</li>
				</menu>
			</header>
			<main className = {styles.container}>
				<Link href = "/">
					<img src = "/logo.png" width = {30} height = {30} />
				</Link>
				{children}
			</main>
			<footer className = {styles.footer}>
				<div>
					<ul>
						<img src = "/logo.png" width = {15} height = {15} /> lang.which
					</ul>
					<ul>
						<a href = "https://langwhich.instatus.com/">website status</a>
					</ul>
				</div>
				<div>
					<ul>
						<b>contact</b>
					</ul>
					<ul>
						&#169; 2023 emily nagy
					</ul>
					<ul>
						<a href = "https://emily.bz">hire me</a>
					</ul>
					<ul>
						<Link href = "/contact">contact</Link>
					</ul>
				</div>
				<div className = {styles.gamenav}>
					<ul>
						<b>game</b>
					</ul>
					<ul>
						<Link href = "/play">play</Link>
					</ul>
					<ul>
						<Link href = "/settings">settings</Link>
					</ul>
					<ul>
						<Link href = "/submit">submit</Link>
					</ul>
					<ul>
						<Link href = "/statistics">statistics</Link>
					</ul>
					<ul>
						<Link href = "/about">about</Link>
					</ul>
				</div>
			</footer>
		</body>
	</html>
}