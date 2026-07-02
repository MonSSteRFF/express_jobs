import { JobsService } from "@infra/jobs/jobs.service";
import { Db } from "@/infra/db/db";

export interface DiContainer {
	db: Db;
	jobs: JobsService;
}

type BaseConstructorArgs = { di: DiContainer };
type ClassConstructor<T> = new (...args: BaseConstructorArgs[]) => T;
type BaseModule = object;
type BaseDiContainer = Record<string, BaseModule>;

const modules = new Map<string, BaseModule>();

// FIXME: remove us unknown and use Awilix
export const createDi = async (): Promise<DiContainer> => {
	const createModule = (name: string, module: ClassConstructor<BaseModule>) => {
		if (modules.has(name)) {
			return modules.get(name);
		}
		const instance = new module({ di: container as unknown as DiContainer });
		modules.set(name, instance);
		return instance;
	};

	const container: BaseDiContainer = {};

	Object.defineProperty(container, "db", {
		get() {
			return createModule("db", Db);
		},
	});

	Object.defineProperty(container, "jobs", {
		get() {
			return createModule("jobs", JobsService);
		},
	});

	return container as unknown as DiContainer;
};
