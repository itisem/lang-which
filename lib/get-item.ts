export default function getItem(key: string, defaultValue: string){
	if(typeof window === "undefined") return defaultValue;
	return localStorage.getItem(key) ?? defaultValue;
}