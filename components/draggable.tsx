import type {ReactNode} from "react";
import {useState, useRef} from "react";
import styles from "../styles/draggable.module.css"

interface DraggableProps{
	children: ReactNode;
};

export default function Draggable({children}: DraggableProps){
	const dragContents = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [mouse, setMouse] = useState({
		start: {x: 0, y: 0},
		scroll: {x: 0, y: 0}
	});
	return <div
		ref = {dragContents}
		className = {styles.draggable}
		style = {{cursor: dragging ? "grabbing" : "grab"}}
		onMouseDown = {e => {
			setMouse({
				start: {
					x: e.pageX,
					y: e.pageY
				},
				scroll: {
					x: dragContents.current.scrollLeft,
					y: dragContents.current.scrollTop
				}
			});
			setDragging(true);
		}}
		onMouseUp = {e => {
			setDragging(false);
		}}
		onMouseMove = {e => {
			const multiplier = 1.5;
			if(!dragging) return;
			const x = e.pageX;
			const y = e.pageY;
			const xDiff = x - mouse.start.x;
			const yDiff = y - mouse.start.y;
			dragContents.current.scrollLeft = mouse.scroll.x - xDiff * multiplier;
			dragContents.current.scrollTop = mouse.scroll.y - yDiff * multiplier;
		}}
	>
			{children}
	</div>
}