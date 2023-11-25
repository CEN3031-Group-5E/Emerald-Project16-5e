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

  if (ctx.state.user.isStudent) {
    const ids = ctx.state.user.ids;
    if (isStudentParam && ids.includes(idParam)) {
      return await next();
    }
  } else {
    const id = ctx.state.user.id;
    if (!isStudentParam && id == idParam) {
      return await next();
    }
  }

  ctx.unauthorized(`You can only modify your own profile!`)
}
