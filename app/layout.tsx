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
				<input type = "checkbox" id = "menu-toggle" />
				<label htmlFor = "menu-toggle"></label>
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