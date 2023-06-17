import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql";
import { yoga } from "../../../server";
import { forEach } from "lodash";

describe("Ticket tests", () => {
    let executor;

    beforeAll(() => {
        executor = buildHTTPExecutor({
            fetch: yoga.fetch,
        });
    });

    it("Evente filtered by name", async () => {
        const userId = "646f7007e60b814321d18029";

        let result = await executor({
            document: parse(`
        query {
            ticketPageQuery(filterParams: {userId: "${userId}"}) {
            userId
          }
        }
      `),
        });

        result = result["data"]["event"];

        forEach(result, ({ userId: ticketUserId }) => {
            expect(ticketUserId).toBe(userId);
        });
    });



});

// describe('Ticket create', () => {
//     it("test create ticket", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Ticket get', () => {
//     it("test get ticket", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Ticket update', () => {
//     it("test update ticket", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Ticket for sale', () => {
//     it("put ticket on market", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Ticket not for sale', () => {
//     it("take ticket off market", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Ticket valida', () => {
//     it("test valid ticket", () => {
//         expect(true).toBe(true);
//     });
// })
// describe('Event invalid', () => {
//     it("test invalid ticket", () => {
//         expect(true).toBe(true);
//     });
// })
