import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('cake', {
  schema: 'cake',
})
export class CakeEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({
    type: 'int',
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (databaseValue: string): number => parseInt(databaseValue, 10),
    },
  })
  id: number;

  // @Column('varchar', {
  //   nullable: true,
  //   length: 128,
  // })
  // image: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
  })
  price: string;
}
