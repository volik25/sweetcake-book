import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('access_token', {
  schema: 'security',
})
class AccessTokenEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'int',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Column('varchar', {
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column('int', {
    nullable: true,
    select: false,
  })
  expires: number;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}

export { AccessTokenEntity };
