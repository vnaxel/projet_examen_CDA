import Keycloak from "keycloak-js"

const keycloak = new Keycloak({
    realm: 'Examen-CDA',
    url: 'http://localhost:8080/',
    clientId: 'react-client',
})

export default keycloak;