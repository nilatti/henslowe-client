import { createContext, useContext, useEffect, useState } from "react";
const roles = "";
export const AppAuthContext = createContext(roles);

import { useMeState } from "../lib/meState";
import {
  getOverlap,
  getSuperAdminRole,
  getUserRoleForProduction,
  getUserRoleForSpace,
  getUserRoleForTheater,
} from "../utils/authorizationUtils";

const SuperAuthContext = createContext();
const SuperAuthStateProvider = SuperAuthContext.Provider;
function SuperAuthProvider({ children }) {
  const { me } = useMeState();
  const [role, setRole] = useState("visitor");
  useEffect(() => {
    if (getSuperAdminRole(me)) {
      setRole("superadmin");
    }
  }, []);
  return (
    <SuperAuthStateProvider value={{ role }}>{children}</SuperAuthStateProvider>
  );
}

function useSuperAuthState() {
  const all = useContext(SuperAuthContext);
  return all;
}

export { SuperAuthProvider, useSuperAuthState };

//production auth provider
const ProductionAuthContext = createContext();
const ProductionAuthStateProvider = ProductionAuthContext.Provider;

function ProductionAuthProvider({ productionId, children }) {
  const { me } = useMeState();
  const [role, setRole] = useState("unset");
  useEffect(async () => {
    // if (productionId) {
    let userRole = await getUserRoleForProduction({
      user: me,
      productionId: productionId,
    });
    setRole(userRole);
    // }
  }, [productionId]);
  return (
    <ProductionAuthStateProvider value={{ role }}>
      {children}
    </ProductionAuthStateProvider>
  );
}

function useProductionAuthState() {
  const all = useContext(ProductionAuthContext);
  return all;
}

export { ProductionAuthProvider, useProductionAuthState };

//space auth provider
const SpaceAuthContext = createContext();
const SpaceAuthStateProvider = SpaceAuthContext.Provider;

function SpaceAuthProvider({ spaceId, children }) {
  const { me } = useMeState();
  const [role, setRole] = useState("unset");
  useEffect(async () => {
    if (spaceId) {
      let userRole = await getUserRoleForSpace(me, spaceId);
      setRole(userRole);
    }
  }, [spaceId]);
  return (
    <SpaceAuthStateProvider value={{ role }}>{children}</SpaceAuthStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useSpaceAuthState() {
  // We use a consumer here to access the local state
  const all = useContext(SpaceAuthContext);
  return all;
}

export { SpaceAuthProvider, useSpaceAuthState };

//theater auth provider
const TheaterAuthContext = createContext();
const TheaterAuthStateProvider = TheaterAuthContext.Provider;

function TheaterAuthProvider({ theaterId, children }) {
  const { me } = useMeState();
  const [role, setRole] = useState("unset");
  useEffect(async () => {
    if (theaterId) {
      let userRole = await getUserRoleForTheater(me, theaterId);
      setRole(userRole);
    }
  }, [theaterId]);
  return (
    <TheaterAuthStateProvider value={{ role }}>
      {children}
    </TheaterAuthStateProvider>
  );
}

function useTheaterAuthState() {
  const all = useContext(TheaterAuthContext);
  return all;
}

export { TheaterAuthProvider, useTheaterAuthState };

//user auth provider
const UserAuthContext = createContext();
const UserAuthStateProvider = UserAuthContext.Provider;

function UserAuthProvider({ user, children }) {
  const { me } = useMeState();
  const [roles, setRoles] = useState(["unset"]);
  useEffect(() => {
    if (me) {
      if (getSuperAdminRole(me)) {
        setRoles(["superadmin"]);
        return;
      }
      if (me.id === user.id) {
        setRoles(["self"]);
        return;
      }
      if (me && user) {
        setRoles(getOverlap(me, user));
      }
    }
  }, [me]);

  // } else if

  // useEffect(() => {
  //   if (me.jobs) {
  //     let userRole = getUserRoleForTheater(me, theaterId);
  //     setRole(userRole);
  //   } else {
  //     setRole("visitor");
  //   }
  // });
  return (
    <UserAuthStateProvider value={{ roles }}>{children}</UserAuthStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useUserAuthState() {
  // We use a consumer here to access the local state
  const all = useContext(UserAuthContext);
  return all;
}

export { UserAuthProvider, useUserAuthState };
