import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityGroupDto } from './dtos/create-activity.dto';
import { UpdateActivityGroupDto } from './dtos/update-activity.dto';
import { ResponseBuilder } from 'src/global/utils/response-builder.util';
import { ResponseFormat } from 'src/global/interfaces/response-format.interface';

@Controller('activity-groups')
@ApiTags('Activity Groups')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Post()
  public async create(@Body() createActivityGroupDto: CreateActivityGroupDto): Promise<ResponseFormat> {
    const createdActivity = await this.activityService.insert(createActivityGroupDto);
    return ResponseBuilder.SuccessResponse(createdActivity);
  }

  @Get()
  public async findAll(): Promise<ResponseFormat> {
    const activities = await this.activityService.findAll();
    return ResponseBuilder.SuccessResponse(activities);
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<ResponseFormat> {
    const activity = await this.activityService.findOne(id);
    if (!activity) return ResponseBuilder.NotFoundResponse(`Activity with ID ${id} Not Found`)
    return ResponseBuilder.SuccessResponse(activity);
  }
  
  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateArticleDto: UpdateActivityGroupDto): Promise<ResponseFormat> {
    const activity = await this.activityService.findOne(id);
    if (!activity) return ResponseBuilder.NotFoundResponse(`Activity with ID ${id} Not Found`)
    const updatedActivity = await this.activityService.update(id, updateArticleDto);
    return ResponseBuilder.SuccessResponse(updatedActivity);
  }
  
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<ResponseFormat> {
    const activity = await this.activityService.findOne(id);
    if (!activity) return ResponseBuilder.NotFoundResponse(`Activity with ID ${id} Not Found`)
    const deletedActivity = await this.activityService.delete(id);
    return ResponseBuilder.SuccessResponse(deletedActivity);
  }
}
