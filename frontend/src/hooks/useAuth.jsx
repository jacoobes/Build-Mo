import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
        useEffect(() => {
            fetch("/api/is-auth", { credentials: 'include' })
            .then(res => res.json())
            .then(jon => setAuth(jon.yes))
        }, [])
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setAuth(true)
        navigate("/build");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setAuth(false);
        navigate("/", { replace: true });
    };

    const value = useMemo(() => ({ user: auth, login, logout }), [auth]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
/**
 *
 * @return {ReturnType<typeof AuthProvider>}
 */
export const useAuth = () => {
    return useContext(AuthContext);
};
