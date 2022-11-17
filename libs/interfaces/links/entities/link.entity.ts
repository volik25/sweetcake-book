import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('link', {
  schema: 'main',
})
export class LinkEntity extends BaseEntity {
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
    nullable: true,
    length: 255,
  })
  img: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
  })
  link: string;
}
