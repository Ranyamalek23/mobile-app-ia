import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Session } from 'src/session/session.entity';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;

  @Column()
  password: string;

  @Column()
  birthday: string;

  @Column()
  country: string;

  @Column()
  gender: string;

  @Column('float')
  weight: number;

  @Column('float')
  height: number;

  @Column({ default: 'Débutant' })
  fitness_level: string;

  @OneToMany(() => Session, (session) => session.user)
sessions: Session[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password,10)
  }
}
