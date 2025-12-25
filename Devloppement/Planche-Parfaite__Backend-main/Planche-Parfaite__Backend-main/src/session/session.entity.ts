import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Posture } from '../posture/posture.entity';
import { User } from '../users/users.entity';
import { Feedback } from 'src/feedback/feedback.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID unique de la session' })
  id: number;

  @ManyToOne(() => User, (user) => user.sessions)
  @ApiProperty({ description: 'Utilisateur lié à la session' })
  user: User;

  @ManyToOne(() => Posture, (posture) => posture)
  @ApiProperty({ description: 'Posture liée à la session' })
  posture: Posture;

  @OneToMany(() => Feedback, (feedback) => feedback.session, { cascade: true })
  @ApiProperty({ description: 'Liste des feedbacks associés à la session' })
  feedbacks: Feedback[];


  @Column()
  @ApiProperty({ description: 'Durée de la session en secondes' })
  duration: number;

  @Column({ type: 'enum', enum: ['En cours', 'Terminée'], default: 'En cours' })
  @ApiProperty({ description: 'Statut de la session', enum: ['En cours', 'Terminée'] })
  status: 'En cours' | 'Terminée';

  @Column({ default: false })
  @ApiProperty({ description: 'Posture validée', default: false })
  posture_valid: boolean;

  @Column({ default: 0 })
  @ApiProperty({ description: 'Durée correcte en secondes' })
  correct_duration: number;

  @Column({ type: 'float', default: 0.0 })
  @ApiProperty({ description: 'Score de posture' })
  posture_score: number;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Heure de début' })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ description: 'Heure de fin', required: false })
  end_time?: Date;
}
