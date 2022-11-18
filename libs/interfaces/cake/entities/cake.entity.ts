import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CakeComponentEntity } from './component.entity';

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

  @Column('varchar', {
    nullable: true,
    length: 128,
  })
  img: string;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column('int', {
    nullable: false,
  })
  price: number;

  @Column('float', {
    nullable: false,
    scale: 1,
  })
  weight: number;

  @ManyToOne(() => CategoryEntity, (category) => category.cakes)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  @ManyToMany(() => CakeComponentEntity, (component) => component.cakes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'cake_components',
  })
  components: CakeComponentEntity[];
}
