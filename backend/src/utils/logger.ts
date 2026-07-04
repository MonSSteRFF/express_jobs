export const logger = (...args: unknown[]): void => {
	const d = new Date();
	const date =
		`${d.getHours().toString().padStart(2, "0")}:` +
		`${d.getMinutes().toString().padStart(2, "0")}:` +
		`${d.getSeconds().toString().padStart(2, "0")}.` +
		`${d.getMilliseconds().toString().padStart(3, "0")}`;

	console.log(date, "|", ...args);
};
