import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

interface EndpointSchema<
	TBody extends z.ZodTypeAny = z.ZodTypeAny,
	TParams extends z.ZodTypeAny = z.ZodTypeAny,
	TQuery extends z.ZodTypeAny = z.ZodTypeAny,
	TResponse extends z.ZodTypeAny = z.ZodTypeAny,
> {
	request?: {
		body?: TBody;
		params?: TParams;
		query?: TQuery;
	};
	response?: TResponse;
}

export const validateRoute = <
	TBody extends z.ZodTypeAny,
	TParams extends z.ZodTypeAny,
	TQuery extends z.ZodTypeAny,
	TResponse extends z.ZodTypeAny,
>(
	schema: EndpointSchema<TBody, TParams, TQuery, TResponse>,
) => {
	return async (
		req: Request<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			if (schema.request?.body) {
				req.body = await schema.request.body.parseAsync(req.body);
			}
			if (schema.request?.params) {
				req.params = await schema.request.params.parseAsync(req.params);
			}
			if (schema.request?.query) {
				req.query = await schema.request.query.parseAsync(req.query);
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res
					.status(400)
					.json({ error: "Validation request failed", details: error });
			}
			return next(error);
		}

		if (schema.response) {
			const originalJson = res.json;
			res.json = function (bodyData: unknown) {
				try {
					// biome-ignore lint/style/noNonNullAssertion: if response not exist in schema just catch
					const validatedResponse = schema.response!.parse(bodyData);
					return originalJson.call(this, validatedResponse);
				} catch (error) {
					return res
						.status(400)
						.json({ error: "Validation response failed", details: error });
				}
			};
		}

		next();
	};
};
