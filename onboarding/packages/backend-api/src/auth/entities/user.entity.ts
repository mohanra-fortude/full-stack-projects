import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Organization } from "../../organization/entities/organization.entity";

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({ nullable: false, unique: true, length: 50 })
    email: string;

    @Column({ nullable: false, length: 100 })
    passwordHash: string;

    @Column({ nullable: false, unique: true, length: 15 })
    mobile: string;

    @Column({ nullable: true, default: "default-profile-image.jpg", length: 250})
    profilePicture: string;

    @Column({ nullable: true })
    lastLogin: Date;

    @Column({
        nullable: false,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        nullable: false,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP()",
        onUpdate: "CURRENT_TIMESTAMP()",
    })
    updatedAt: Date;

    @Column({ nullable: true, default: "admin", length: 50 })
    createdBy: string;

    @Column({ nullable: true, default: "admin", length: 50 })
    updatedBy: string;

    @Column({ nullable: false, default: 1 })
    isActive: boolean;

    @Column({ nullable: true, length: 50 })
    token: string;

    @Column({ default: null, length: 500 })
    userToken: string;

    @Column({ default: true || null })
    firstTimeLogin: boolean;

    @ManyToOne(() => Organization, (orgId) => orgId.id)
    @JoinColumn({ name: "orgId" })
    orgId: Organization[];

    @BeforeInsert()
    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10); // hashed password
    }
}
