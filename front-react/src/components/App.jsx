import "../style/App.css"
import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import keycloak from "./keycloak"
import Home from "./Home"
import Tracking from "./Tracking"
import CreateSending from "./CreateSending"
import Nav from "./Nav"
import PrivateRoute from "../helpers/PrivateRoute"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"

const theme = createTheme({
    typography: {
        fontSize: 13,
        fontWeightRegular: 300,
        fontWeightBold: 400,
        fontWeightMedium: 400,
    },
})

const App = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <ThemeProvider theme={theme}>
                <React.StrictMode>
                    <div className="app">
                        <BrowserRouter>
                            <Nav />
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route
                                    path="/send"
                                    element={
                                        <PrivateRoute>
                                            <CreateSending />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/tracking"
                                    element={
                                        <PrivateRoute>
                                            <Tracking />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </React.StrictMode>
                </ThemeProvider>
        </ReactKeycloakProvider>
    )
}

export default App
