import { DefaultBaseEntity } from 'src/typeorm/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('products')
export class Product extends DefaultBaseEntity {
  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  public code: string;

  @Column({ type: 'text', nullable: true })
  public previewImgLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public originalPrice: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public discountPrice: string;
}
