"use client";

import styles from "../styles/menu.module.css";
import {useEffect, useRef} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function Menu(){
	const checkbox = useRef(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		checkbox.current.checked = false;
	}, [pathname, searchParams]);

	return <header className = {styles.header}>
		<input type = "checkbox" id = "menu-toggle" className = {styles.checkbox} ref = {checkbox} />
		<label htmlFor = "menu-toggle" className = {styles.lines}>
			<span className = {styles.midline}></span>
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
}