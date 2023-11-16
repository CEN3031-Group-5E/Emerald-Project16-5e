'use strict';

const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const fetchProfile = (id, isStudent) => {
  // The array of strings tells findOne to populate/join the relation
  if (isStudent) {
    return strapi.services.profile.findOne({
      type: "student",
      student: id,
    }, ["student"])
  } else {
    return strapi.services.profile.findOne({
      type: "user",
      user: id,
    }, ["user", "user.role"])
  }
};

module.exports = {
  async findOne(ctx) {
    const id = ctx.params.id;
    const isStudent = Boolean(JSON.parse(ctx.request.query.student ?? "false"));

    let profile = await fetchProfile(id, isStudent);
    if (!profile) {
      // Create profile
      if (isStudent) {
        const student = await strapi.services.student.findOne({
          id: id,
        });

        if (!student) {
          return;
        }

        await strapi.services.profile.create({
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

        await strapi.services.profile.create({
          type: "user",
          user: user,
        })
      }

      // Fetch again now that the profile has been created
      profile = await fetchProfile(id, isStudent);
    }

    // 404
    if (!profile) {
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
