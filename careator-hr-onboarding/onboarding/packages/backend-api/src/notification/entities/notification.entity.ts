import { UserEntity } from "../../auth/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "notification" })
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.userId, { nullable: false })
    @JoinColumn({ name: "userId" })
    userId: UserEntity;

    @Column({ nullable: true, length: 50 })
    fromEmail: string;

    @Column({ nullable: true, length: 300 })
    toEmail: string;

    @Column({ nullable: true, length: 100 })
    subject: string;

    @Column({
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
        type: "timestamp",
    })
    createdAt: Date;

    @Column({
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
        type: "timestamp",
    })
    updatedAt: Date;

    @Column({ nullable: true, length: 50 })
    createdBy: string;

    @Column({ nullable: true, length: 50 })
    updatedBy: string;

    @Column({ nullable: true, default: false, type: "tinyint" })
    isActive: boolean;
    @Column({ nullable: true, default: false, type: "tinyint" })
    unRead: boolean;
}
