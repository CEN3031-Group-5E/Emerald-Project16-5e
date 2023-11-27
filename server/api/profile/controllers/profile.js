'use strict';

const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const id = Number(ctx.params.id);
    const isStudent = Boolean(JSON.parse(ctx.request.query.student ?? "false"));

    let profile = await strapi.services.profile.tryFindOrCreate(id, isStudent);
    if (!profile) {
      // 404

      return;
    }

    // Return and santize to remove private fields
    return {
      profile: sanitizeEntity(profile, {
        model: strapi.models.profile,
      }),
    }
  },
}
