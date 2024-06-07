// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    control: {
      root: `${ROOTS.DASHBOARD}/control`,
      new: `${ROOTS.DASHBOARD}/control/create-catalog`,
      list: `${ROOTS.DASHBOARD}/control/list-catalog`,
      edit: `${ROOTS.DASHBOARD}/control/edit-catalog`,
    },
  },
};
