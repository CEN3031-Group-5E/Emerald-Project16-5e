'use strict';

const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const id = ctx.params.id;
    const isStudent = Boolean(JSON.parse(ctx.request.query.student));

    let profile = await (() => {
      if (isStudent) {
        return strapi.services.profile.findOne({
          type: "student",
          student: id,
        }, ["student"])
      } else {
        return strapi.services.profile.findOne({
          type: "user",
          user: id,
        }, ["user"])
      }
    })()

    if (!profile) {
      if (isStudent) {
        const student = await strapi.services.student.findOne({
          id: id,
        });

        if (!student) {
          return;
        }

        profile = await strapi.services.profile.create({
          type: "student",
          student: student,
        })
      } else {
        const user = await strapi.query('user', 'users-permissions').findOne({
          id: id,
        });

        if (!user) {
          return;
        }

        profile = await strapi.services.profile.create({
          type: "user",
          user: user,
        })
      }
    }

    if (!profile) {
      return;
    }

    return {
      profile: sanitizeEntity(profile, {
        model: strapi.models.profile,
      }),
    }
  },
}
