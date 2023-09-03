import { NextFunction, Request, Response } from "express";
import { statusHTTP } from "../../constants/statusHTTP";
import { PermissionError } from "../../errors/PermissionError";
import { QueryError } from "../../errors/QueryError";

export function errorHandler( error: Error, request: Request, response: Response, next: NextFunction ) {
    let message = error.message;
    let status = statusHTTP.internal_server_error;

    if (Error instanceof PermissionError) {
        status = statusHTTP.unauthorized;
    }

    if (Error instanceof QueryError) {
        status = statusHTTP.bad_request;
    }

    console.log( error );
    response.status( status ).json( message );
}