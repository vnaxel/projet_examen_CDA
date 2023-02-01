import express, { Request, Response } from "express"
import { keycloak } from "../config/keycloak"

export const todoController = (req: Request, res: Response) => {

    keycloak.getGrant(req, res)
        .then(grant => 
            keycloak.grantManager.userInfo(grant.access_token!!)
            .then(userInfo => console.log(userInfo))
        )
        .catch(e => console.log(e))

    res.send('the todo')
}