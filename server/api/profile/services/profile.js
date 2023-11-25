'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * @param {number} id
   * @param {boolean} isStudent
   */
  async tryFind(id, isStudent) {
    // The array of strings tells findOne to populate/join the relation
    if (isStudent) {
      return await strapi.services.profile.findOne({
        type: "student",
        student: id,
      }, ["student", "profileImage"])
    } else {
      return await strapi.services.profile.findOne({
        type: "user",
        user: id,
      }, ["user", "user.role", "profileImage"])
    }
  },

  /**
   * @param {number} id
   * @param {boolean} isStudent
   */
  async tryFindOrCreate(id, isStudent) {
    let profile = await strapi.services.profile.tryFind(id, isStudent);
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

      // Find again now that the profile has been created
      profile = await strapi.services.profile.tryFind(id, isStudent);
    }

    return profile;
  }
}
