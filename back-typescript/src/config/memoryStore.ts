import session from 'express-session'

const memoryStore: session.MemoryStore = new session.MemoryStore()

const appSession = session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
})

export {appSession, memoryStore}