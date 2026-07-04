import { env } from "@utils/env";

class ApiClient {
	private api_url: URL;
	constructor(api: string) {
		this.api_url = new URL(api);
	}
	get = (link: string) => fetch(this.api_url.toString() + link, { method: "GET" });
	post = (link: string, body: object) => fetch(this.api_url.toString() + link, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
	delete = (link: string) => fetch(this.api_url.toString() + link, { method: "DELETE" });
}

export const $api = new ApiClient(env.API_ENDPOINT);
