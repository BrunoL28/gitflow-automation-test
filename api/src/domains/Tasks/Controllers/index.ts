import { NextFunction, Request, Response, Router } from "express";
import { statusHTTP } from "../../../../constants/statusHTTP";
import { TaskService } from "../Service/TaskServices";

export const router = Router();

router.get( "/list", async( request : Request, response : Response, next : NextFunction ) => {
    try {
        const tasks = await TaskService.getAll();
        response.status( statusHTTP.success ).send( tasks );
    } catch ( error ) {
        next( error );
    }
});

router.get( "/list/:name", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const task = await TaskService.getByName( request.params.name );
        response.status( statusHTTP.success ).send( task );
    } catch ( error ) {
        next( error );
    }
} );

router.post( "/create", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        await TaskService.postTask( request.body );
        response.status( statusHTTP.created ).json( { "Aviso": "Task criada com sucesso!" } ).end();
    } catch ( error ) {
        next( error );
    }
} );

router.put( "/:id", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        await TaskService.putTask( request.params.id, request.body );
        response.status( statusHTTP.success ).json( { "Aviso": "Task atualizada com sucesso!" } ).end();
    } catch ( error ) {
        next( error );
    }
} );

router.delete( "/delete/:id", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        await TaskService.deleteTask( request.params.id );
        response.status( statusHTTP.no_content ).json( { "Aviso": "Task deletada com sucesso!" } ).end();
    } catch ( error ) {
        next( error );
    }
} );