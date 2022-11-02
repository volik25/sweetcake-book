import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AccessTokenEntity } from './access.token.entity';

@Entity('user', {
  schema: 'user',
})
export class UserEntity extends BaseEntity {
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
    nullable: false,
    length: 128,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
  })
  surname: string;

  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  secondname: string;

  @Index('userEmailIndex', { unique: true })
  @Column('varchar', {
    nullable: false,
    length: 128,
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    select: false,
  })
  password: string;

  @OneToMany(() => AccessTokenEntity, (token) => token.user)
  tokens: AccessTokenEntity[];
}
