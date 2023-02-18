import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  readonly type: string;

  @Column({ type: 'integer' })
  readonly status_code: number;

  @Column({ type: 'longtext' })
  readonly message: string;

  @Column({ type: 'varchar', length: 50 })
  readonly ip: string;

  @Column({ type: 'varchar', length: 355, nullable: true })
  readonly user_agent?: string;

  @Column({ type: 'longtext', nullable: true })
  readonly full_request?: any;

  @Column({ type: 'longtext', nullable: true })
  readonly full_response?: any;

  @Column({ type: 'longtext', nullable: true })
  readonly stacks?: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
