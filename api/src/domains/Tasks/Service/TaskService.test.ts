import { QueryError } from "../../../../errors/QueryError";
import { Task, TaskInterface } from "../Models/Tasks";
import { TaskService } from "./TaskServices";

jest.mock( "../Models/Tasks", () => ( {
    Task: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
} ) );

//----------------------------------------------- Teste - Função getAll -------------------------------------------------------//

describe( "getAll", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna todas as tasks armazenadas.", async() => {
        const mockTasks = [
            {
                id: "1",
                title: "Estudando TypeScript.",
                status: "Em andamento",
                created_at: new Date(),
            } as TaskInterface,
            {
                id: "2",
                title: "Estudando Docker.",
                status: "Concluída",
                created_at: new Date(),
            } as TaskInterface,
        ];
        ( Task.findAll as jest.MockedFunction< typeof Task.findAll > ).mockResolvedValue( mockTasks );

        const tasks = await TaskService.getAll();

        expect( tasks ).toEqual( mockTasks );
        expect( Task.findAll ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método é chamado => Retorna um erro.", async() => {
        ( Task.findAll as any ).mockResolvedValue( null );
        await expect( TaskService.getAll ).rejects.toThrow( new QueryError( "Nenhuma task foi encontrada!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getById ------------------------------------------------------//

describe( "getById", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna a task relativa ao id passado.", async() => {
        const id = "1";

        const mockTask = {
            id: "1",
            title: "Estudando TypeScript.",
            status: "Em andamento",
            created_at: new Date(),
        } as TaskInterface;

        ( Task.findByPk as jest.MockedFunction< typeof Task.findByPk > ).mockResolvedValue( mockTask );

        const task = await TaskService.getById( id );

        expect( task ).toEqual( mockTask );
        expect( Task.findByPk ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método recebe um id que não existe => Retorna erro.", async() => {
        const id = "1";
        ( Task.findByPk as any ).mockResolvedValue( null );
        await expect( TaskService.getById( id ) ).rejects.toThrow( new QueryError( "Nenhuma task foi encontrada!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getByName ----------------------------------------------------//

describe( "getByName", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Recebe um nome e retorna a task com esse nome.", async() => {
        const title = "Estudando Docker.";

        const mockTask = {
            id: "1",
            title: "Estudando Docker.",
            status: "Concluída",
            created_at: new Date(),
        } as TaskInterface;    
        
        ( Task.findOne as jest.MockedFunction< typeof Task.findOne > ).mockResolvedValue( mockTask );

        const task = await TaskService.getByName( title );

        expect( task ).toEqual( mockTask );
        expect( Task.findOne ).toHaveBeenCalledTimes( 1 );
        expect( Task.findOne ).toHaveBeenCalledWith( {
            where: {
                title: title,
            },
        } );
    } );

    test( "Método recebe um nome que não existe => Retorna erro.", async() => {
        const title = "";
        ( Task.findOne as any ).mockResolvedValue( null );
        await expect( TaskService.getByName( title ) ).rejects.toThrow( new QueryError( "Nenhuma task foi encontrada!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função postTask -----------------------------------------------------//

describe( "postTask", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe dados de uma nova task => Chama o create() para criar a task.", async() => {
        const mockCreateTask = {
            id: "1",
            title: "Teste.",
            status: "A fazer.",
            created_at: new Date(),
        } as TaskInterface;

        ( Task.create as jest.MockedFunction< typeof Task.create > ).mockResolvedValue( {} );

        await TaskService.postTask( mockCreateTask );

        expect( Task.create ).toHaveBeenCalledTimes( 1 );
        expect( Task.create ).toHaveBeenCalledWith( mockCreateTask );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função putTask ------------------------------------------------------//

describe( "putTask", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id e um objeto com informações => Atualiza a task daquele id com as informações do objeto.", async() => {
        const id = "1";

        const mockUpdateTask = {
            id: "att_teste",
            title: "att_teste",
            status: "att_teste",
            created_at: new Date(),
        } as TaskInterface;

        const task = {
            id: "1",
            title: "teste",
            status: "teste",
            created_at: new Date(),
            update: jest.fn(),
        };

        ( Task.findByPk as any ).mockResolvedValue( task );
        ( Task.update as any ).mockResolvedValue( {} );

        await TaskService.putTask( id, mockUpdateTask );

        expect( Task.findByPk ).toHaveBeenCalledWith( id );
        expect( task.update ).toHaveBeenCalledWith( mockUpdateTask );
        expect( task.update ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função deleteTask ---------------------------------------------------//

describe( "deleteTask", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id => Deleta a task com o respectivo id.", async() => {
        const id = "1";

        const task = {
            id: "1",
            title: "Testando Husky, Commitlint, Commitizen.",
            status: "Em andamento.",
            created_at: new Date(),
            destroy: jest.fn(),
        };

        ( Task.findByPk as any ).mockResolvedValue( task );
        ( Task.destroy as any ).mockResolvedValue( {} );

        await TaskService.deleteTask( id );

        expect( Task.findByPk ).toHaveBeenCalledWith( id );
        expect( task.destroy ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//