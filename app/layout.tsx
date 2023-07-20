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
						<Link href = "/statistics">statistics</Link>
					</li>
					<li>
						<Link href = "/about">about</Link>
					</li>
					<li>
						<Link href = "/submit">submit</Link>
					</li>
					<li>
						<Link href = "/settings">settings</Link>
					</li>
					<li>
						<Link href = "/play">play</Link>
					</li>
				</menu>
			</header>
			<main className = {styles.container}>
				{children}
			</main>
			<footer className = {styles.footer}>
				© 2023. lang.which was made by <a href = "https://emily.bz">emily nagy</a> - hire me! 
				|| <Link href = "/about">about</Link>.
			</footer>
		</body>
	</html>
}