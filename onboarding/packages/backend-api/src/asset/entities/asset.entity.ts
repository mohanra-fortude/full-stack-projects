
import { UserEntity } from "src/auth/entities/user.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    
    OneToOne,
  } from "typeorm";

  @Entity({ name: "asset" })

export class Asset {

    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: "userId" })
    userId: UserEntity[];

    
    @Column({ nullable: false, length: 50,default:'' })
    model: string;
    
    
    @Column({ nullable: true, length: 25 })
    processorType: string;


        
    
    @Column({ nullable: true, length: 25 })
    ram: string;

    @Column({ nullable: true, length: 25 })
    storageType: string;
    
    @Column({ nullable: true, length: 25 })
    storageSpace: string;

    
  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  updatedAt: Date;

  @Column({ nullable: true, length: 50 })
  createdBy: string;

  @Column({ nullable: true, length: 50 })
  updatedBy: string;

  @Column({ nullable: true, default: 1 })
  isActive: boolean;

}
