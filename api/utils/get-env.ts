export function getEnv( name: string ) : string {
    const value = process.env[ name ];
    if ( !value ) {
        throw new Error( `Está faltando: process.env['${name}'].` )
    }
    return value;
}