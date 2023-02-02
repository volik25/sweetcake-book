import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('exchange', {
  schema: 'exchange',
})
export class ExchangeRateEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'int',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  @Column('float', {
    nullable: false,
    scale: 6,
  })
  value: number;

  @CreateDateColumn()
  date: Date;
}
