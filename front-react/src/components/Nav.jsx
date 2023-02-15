import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useKeycloak } from "@react-keycloak/web"
import logo from "../assets/mail-142-cropped.svg"

const Nav = () => {
    const { keycloak } = useKeycloak()

    return (
        <AppBar className="appBar" position="static">
            <Toolbar>
                <Link to="/send">
                    <Button color="inherit" className="btn" size="large">
                        Envoi
                    </Button>
                </Link>
                <Link to="/tracking">
                    <Button color="inherit" className="btn" size="large">
                        Suivi
                    </Button>
                </Link>
                <div className="title">
                    <Link to="/">
                        <Button color="inherit" className="btn__logo">
                            <div className="inline">
                                <img src={logo} alt="" className="logo--cropped" />
                                <Typography variant="h6" component="div">
                                    MAILER
                                </Typography>
                            </div>
                        </Button>
                    </Link>
                </div>
                {!keycloak.authenticated && (
                    <Button
                        size="large"
                        color="inherit"
                        onClick={() =>
                            keycloak.login({
                                redirectUri: window.location.href,
                            })
                        }>
                        Login
                    </Button>
                )}
                {!!keycloak.authenticated && (
                    <Button
                        size="large"
                        color="inherit"
                        onClick={() => {
                            keycloak.logout({
                                redirectUri: "http://localhost:3000",
                            })
                        }}>
                        Logout ({keycloak.tokenParsed.preferred_username})
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Nav
