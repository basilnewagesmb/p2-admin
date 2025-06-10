import { hookstate, useHookstate } from "@hookstate/core";

const initialState = hookstate({
  isVerified: false,
  email: "",
  session_id: "",
  showLoginPage: false,
});

export const useGlobalState = () => {
  const state = useHookstate(initialState);

  return {
    getStatus: () => state.isVerified.value,
    getShowLoginPage: () => state.showLoginPage.value,
    getEmail: () => state.email.value,
    getSessionId: () => state.session_id.value,
    updateStatus: (status: boolean) => state.isVerified.set(status),
    setShowLoginPage: (status: boolean) => state.showLoginPage.set(status),
    setEmail: (email: string) => state.email.set(email),
    setSessionId: (sessionId: string) => state.session_id.set(sessionId),
  };
};
