import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('question', {
  schema: 'main',
})
export class QuestionEntity extends BaseEntity {
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
    length: 255,
  })
  question: string;

  @Column('text', {
    nullable: false,
  })
  answer: string;
}
