import { rest } from "msw";

export const handlers = [
  rest.post("api", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "image_id",
      })
    );
  }),
];
