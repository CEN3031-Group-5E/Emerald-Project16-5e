'use strict';

const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const {id, student} = ctx.request.query

    console.log(ctx);
    console.log(ctx.request.query);
    console.log(ctx.request.body);

    let profile = await (() => {
      if (student) {
        return strapi.services.profile.findOne({
          student: id,
          type: "student",
        }, [])
      } else {
        return strapi.services.profile.findOne({
          user: id,
          type: "user",
        }, [])
      }
    })()

    if (!profile && false) {
      if (student) {
        const student = await strapi.services.student.findOne({
          id: id,
        });

        if (!student) {
          return;
        }

        profile = await strapi.services.profile.create({
          student: id,
          type: "student",
        })
      } else {
        const user = await strapi.services.user.findOne({
          id: id,
        });

        if (!user) {
          return;
        }

        profile = await strapi.services.profile.create({
          student: id,
          type: "student",
        })
      }
    }

    console.log(profile);

    return {
      profile: sanitizeEntity(profile, {
        model: strapi.models.profile,
      }),
    }
  },
}
