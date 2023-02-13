import Keycloak from "keycloak-js"

const keycloak = new Keycloak({
    realm: 'DBL-PPRO',
    url: 'http://localhost:8080/',
    clientId: 'react-client',
})

export default keycloak;