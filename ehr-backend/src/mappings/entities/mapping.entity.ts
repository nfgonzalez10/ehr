import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parameterName: string;

  @Column()
  tenantId: number;

  @Column()
  keyReferenceId: number;
}
