import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KeyReference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;
}
