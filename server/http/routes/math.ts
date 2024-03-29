import {Router} from "https://deno.land/x/oak@14.2.0/mod.ts";
import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";

const mathRouter = new Router();

const CalcValidator = z.object({
  action: z
    .string()
    .refine((str) => ["multiply", "divide", "add", "substract"].includes(str)),
  x: z.number(),
  y: z.number(),
});

const QueryValidator = z.object({
  n: z.coerce.number().optional(),
  m: z.coerce.number().optional(),
});

mathRouter.get("/numbers", async ({request, response}) => {
  const numberList: number[] = [];

  const parsing = QueryValidator.safeParse({
    n: (await request.url.searchParams.get("n")) || undefined,
    m: (await request.url.searchParams.get("m")) || undefined,
  });

  if (!parsing.success) {
    response.status = 422;
    response.body = parsing.error.message;
    return;
  }

  const params = parsing.data;

  const n = params.n === undefined ? 0 : params.n;
  const m = params.m === undefined ? n + 100 : params.m;

  if (m < n) {
    response.status = 422;
    response.body = `Invalid arguments: m cannot be smaller than n (got {n:${n}, m: ${m}})`;
    return;
  }

  for (let i = n; i <= m; i++) {
    numberList.push(i);
  }

  response.body = numberList;
});

mathRouter.post("/calc", async (context) => {
  /**
   * Adds two variables from the body: x and y
   * and responds with its result
   */
  const myBody = await context.request.body
    .json()
    .catch(() => new Error("Invalid JSON"));

  if (myBody instanceof Error) {
    context.response.body = myBody.message;
    return;
  }

  const parsedBody = CalcValidator.safeParse(myBody);

  if (!parsedBody.success) {
    context.response.body = parsedBody.error.message;
    return;
  }

  const action = parsedBody.data.action;
  const x = Number(parsedBody.data.x);
  const y = Number(parsedBody.data.y);

  let result;

  if (action == "multiply") {
    result = x * y;
  } else if (action == "divide") {
    result = x / y;
  } else if (action == "add") {
    result = x + y;
  } else if (action == "substract") {
    result = x - y;
  }

  context.response.body = {result};
});

export {mathRouter};
