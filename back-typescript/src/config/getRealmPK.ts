import fetch from "node-fetch"
import jwksClient from "jwks-rsa"

const getKeycloakRealmPK = async () => {
    try {
        const client = jwksClient({
            jwksUri:
            `${process.env.KEYCLOAK_URL + "/realms/Examen-CDA/protocol/openid-connect/certs"}`
        })

        const data = await fetch(
            `${process.env.KEYCLOAK_URL + "/realms/Examen-CDA/protocol/openid-connect/certs"}`
        ).then(res => res.json())

        const kid = data.keys[1].kid
        const key = await client.getSigningKey(kid)
        process.env["PUBLIC_KEY"] = key.getPublicKey()
        console.log("🔑 Clé publique récupérée 🔑")
        console.log("PUBLIC_KEY: ", process.env["PUBLIC_KEY"])
    } catch (error) {
        console.log("💧 Clé publique non récupérée 💧")
        throw error
    }
}

export default getKeycloakRealmPK
