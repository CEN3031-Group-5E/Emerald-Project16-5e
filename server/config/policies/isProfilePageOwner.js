//
// Checks if the user is the owner of the profile page
//
module.exports = async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.unauthorized(`You're not allowed to perform this action!`)

    return;
  }

  const isStudentParam = Boolean(JSON.parse(ctx.request.query.student ?? "false"));
  const idParam = Number(ctx.params.id);
  const useUserId = Number(JSON.parse(ctx.request.query.useUserId ?? "false"));

  console.log(Object.keys(ctx));

  if (!useUserId) {
    // Profiles can be accessed by profile ID OR by the combination of user id and isStudent.
    // Only the second approach is supported right now.
    ctx.badRequest("Accessing profiles currently only supports accessing by user ID. Please include the 'useUserId=true' query parameter in your request.");

    return;
  }

  if (ctx.state.user.isStudent) {
    const ids = ctx.state.user.ids;
    if (isStudentParam && ids.includes(idParam)) {
      const profile = await strapi.services.profile.tryFindOrCreate(idParam, isStudentParam);
      ctx.params.id = profile.id;

      return await next();
    }
  } else {
    const id = ctx.state.user.id;
    if (!isStudentParam && id == idParam) {
      const profile = await strapi.services.profile.tryFindOrCreate(idParam, isStudentParam);
      ctx.params.id = profile.id;

      return await next();
    }
  }

  ctx.unauthorized(`The requested profile is not your profile.`)
}
