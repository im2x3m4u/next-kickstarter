export const callbacks = {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.username = user.username;
      token.nama = user.nama;
      token.email = user.email;
      token.no_telepon = user.no_telepon;
      token.roles = user.roles;
      token.loginToken = user.loginToken;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user = {
        id: token.id,
        username: token.username,
        nama: token.nama,
        email: token.email,
        no_telepon: token.no_telepon,
        roles: token.roles,
        loginToken: token.loginToken,
      };
    }
    return session;
  },
  async redirect({ url, baseUrl, user }) {
    if (user && "roles" in user) {
      const roles = user.roles as string[];
      if (roles.includes("admin")) return `${baseUrl}/dashboard`;
      return `${baseUrl}/home`;
    }
    return baseUrl;
  },
};
