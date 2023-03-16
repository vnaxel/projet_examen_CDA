import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'


const auth = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: "Access denied" })
    }
    
    const key: string = process.env.PUBLIC_KEY || ''

    if (!key || key === '') {
        return res.status(500).json({ message: "An error occurred while authenticating" })
    }

    const decoded = jwt.verify(token, key, { algorithms: ['RS256'] })

    res.locals.user = decoded

    next()
}

export default auth