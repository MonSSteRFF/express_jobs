import { createDi } from "@infra/di/di";
import { createHttpInterface } from "@inter/http/createHttpInterface";
import { createQueue } from "@inter/queue/createQueue";

const container = await createDi();

// TODO: can independent and run only http interface or queue based on environment
(async () => {
	await createHttpInterface(container);
})();

(async () => {
	await createQueue(container);
})();
