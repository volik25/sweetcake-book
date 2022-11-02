import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('category', {
  schema: 'category',
})
export class CategoryEntity extends BaseEntity {
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
}
