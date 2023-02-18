import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityGroupDto } from './dtos/create-activity.dto';
import { UpdateActivityGroupDto } from './dtos/update-activity.dto';
import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activity: Repository<ActivityEntity>
  ) {}

  async findAll(): Promise<ActivityEntity[]> {
    return await this.activity.find();
  }

  async findOne(id: number): Promise<ActivityEntity> {
    return await this.activity.findOne({ id });
  }

  async insert(createActivityGroupDto: CreateActivityGroupDto): Promise<ActivityEntity> {  
    return await this.activity.save(createActivityGroupDto).catch(err => {
      throw new InternalServerErrorException(err);
    });
  }

  async update(id: number, updateActivityGroupDto: UpdateActivityGroupDto): Promise<ActivityEntity> {
    const activity = await this.activity.findOne({ id });
    if (!activity) {
      throw new NotFoundException('activity not found !');
    }

    activity.title = updateActivityGroupDto.title;
    await activity.save().catch(err => {
      return err;
    });

    return activity;
  }

  async delete(id: number): Promise<ActivityEntity> {
    const article = await this.activity.findOne(id);
    if (!article) {
      throw new NotFoundException('activity not found !');
    }
    
    await this.activity.delete(id);
    return article;
  }
}
