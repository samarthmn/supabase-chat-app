export const hideEmail = function (email: string) {
  if (email.split("@")[0].length <= 2) {
    return email.replace(/(.{0})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += "*";
      }
      return gp2;
    });
  }
  return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
    for (let i = 0; i < gp3.length; i++) {
      gp2 += "*";
    }
    return gp2;
  });
};
