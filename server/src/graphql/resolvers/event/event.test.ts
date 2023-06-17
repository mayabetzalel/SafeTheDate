import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from 'graphql'
import {yoga} from "../../../server";

describe("Event tests", () => {
  let executor;

  beforeAll(() => {
    executor = buildHTTPExecutor({
      fetch: yoga.fetch,
    });
  });

  it("event count need to be number", async () => {
    const result = await executor({
      document: parse(`
        query {
          eventCount
        }
      `),
    });

    console.log(result);

    expect(result["data"].eventCount).not.toBeNaN();
  });
});
