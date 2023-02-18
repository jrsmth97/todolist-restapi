import { ActivityEntity } from '../../activity/entities/activity.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  activity_group_id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;
  
  @Column({ type: 'bool', width: 1 })
  is_active: boolean;

  @Column({ type: 'varchar', length: 10, default: 'very-high' })
  priority: string;

  @ManyToOne(() => ActivityEntity, (activity) => activity.todos)
  @JoinColumn({ name: 'activity_group_id' })
  activity: ActivityEntity;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
