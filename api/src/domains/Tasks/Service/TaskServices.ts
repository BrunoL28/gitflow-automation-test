import { Attributes } from 'sequelize';
import { QueryError } from '../../../../errors/QueryError';
import { Task, TaskInterface } from '../Models/Tasks';

export class TasksServiceClass {

    async getAll() {
        const tasks = await Task.findAll();
        if ( !tasks ) {
            throw new QueryError( "Nenhuma task foi encontrada!" );
        }
        return tasks;
    }

    async getById( id : string ) {
        const task = await Task.findByPk( id );
        if ( !task ) {
            throw new QueryError( "Nenhuma task foi encontrada!" );
        }
        return task;
    }

    async getByName( title : string ) {
        const task = await Task.findOne( {
            where: {
                title: title,
            }
        } );
        if ( !task ) {
            throw new QueryError( "Nenhuma task foi encontrada!" );
        }
        return task;
    }

    async postTask( body : Attributes<TaskInterface> ) {
        if ( body.status === "" || body.title === "" ) {
            throw new QueryError( "Atributos da task incompletos!" );
        }
        await Task.create( body );
    }

    async putTask( id : string, att_task : Attributes<TaskInterface> ) {
        const task = await this.getById( id );
        if ( att_task.status === "" || att_task.title === "" ) {
            throw new QueryError( "Atributos de task incompletos!" );
        }
        await task.update( att_task );
    }
     
    async deleteTask( id : string ) {
        const task = await this.getById( id );
        await task.destroy();
    }

}

export const TaskService = new TasksServiceClass();

