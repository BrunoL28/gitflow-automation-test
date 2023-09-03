declare namespace NodeJS {
    interface ProcessEnv {
        CLIENT_URL: string | undefined,
        PORT: string | undefined,
        NODE_ENV: string | undefined,
    }   
}