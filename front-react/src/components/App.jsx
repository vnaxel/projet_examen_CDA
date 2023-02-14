import "../style/App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import Home from "./Home";
import Tracking from "./Tracking";
import CreateSending from "./CreateSending";
import Nav from "./Nav";
import PrivateRoute from "../helpers/PrivateRoute";

const App = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
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
        </ReactKeycloakProvider>
    );
};

export default App;
