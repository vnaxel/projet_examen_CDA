import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
    const { keycloak } = useKeycloak();

    return (
        <AppBar className="appBar" position="static">
        <Toolbar>
            <Button color="inherit" className="btn"><Link to="/">Home</Link></Button>
            <Button color="inherit" className="btn"><Link to="/send">Envoi</Link></Button>
            <Button color="inherit" className="btn"><Link to="/tracking">Suivi</Link></Button>
            <Typography
                variant="h6"
                component="div"
                className="title"
            >
                {!!keycloak.authenticated && 'Outil d\'envois - ' + keycloak.tokenParsed.preferred_username}
            </Typography>
            {!keycloak.authenticated && (
                <Button
                    color="inherit"
                    onClick={() => keycloak.login({redirectUri: window.location.href})}
                >
                    Login
                </Button>
            )}
            {!!keycloak.authenticated && (
                <Button
                    color="inherit"
                    onClick={() => {
                        keycloak.logout({redirectUri: 'http://localhost:3000'})
                    }}
                >
                    Logout ({keycloak.tokenParsed.preferred_username})
                </Button>
            )}

            
        </Toolbar>
    </AppBar>
    )
}

export default Nav