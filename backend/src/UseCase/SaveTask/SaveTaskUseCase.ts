import { Injectable,BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';
import { log } from 'console';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */
    try {
      if (!dto.name.trim()) {
        throw new BadRequestException('La tâche ne doit pas être vide');
      }
     return await this.taskRepository.save(dto);
    } catch (error) {
       throw new BadRequestException(error.message);
    }
  }
}
