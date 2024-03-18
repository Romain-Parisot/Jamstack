/**
 * market controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::market.market",
  ({ strapi }) => ({
    async(ctx) {
      const { id } = ctx.params;
      const entity = strapi.db.query("api::market.market").findOne({
        where: { slug: id },
        populate: ["image", "favorites"],
      });

      const sanitizedEntity = this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
