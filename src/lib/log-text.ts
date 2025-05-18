import { invoke } from "@tauri-apps/api/core";

export async function logText(
	text: string,
	level?: "info" | "warn" | "error" | "debug" | "trace",
) {
	await invoke("log_text", { text, level });
}
