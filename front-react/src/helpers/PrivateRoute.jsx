import { useKeycloak } from "@react-keycloak/web"

const PrivateRoute = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : initialized ? keycloak.login() : null;
}

export default PrivateRoute