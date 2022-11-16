export const PublicRouts = {
  LANDING: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  BLOCKED: '/login/:blocked',
  LOG: '/login/:id/:googleId/:username/:mail/:name/:lastname/:type/:image/:activos/:status',
};

export const PrivateRoutes = {

  HOME: "/home",
  PORTFOLIO: "/portfolio",
  NEWS: "/news",
  SWAP: "/swap",
  WALLET: "/wallet",
  USER: "/profile",
  REVIEW: "/review",
  CRYPTO: "/crypto/:nameActi",
  CALCULATOR: "/calculator",
  VERIFIQUED: "/verifiqued/:token",
  DONATE: "/donate",
  DONATE_SUCCESS: "/donate/success",
};

export const PrivateAdminRoutes = {

  ADMIN: "/admin/*",

};
