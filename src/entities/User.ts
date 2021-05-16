import {
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    Column,
    Index,
} from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
    @PrimaryColumn({ length: 40 })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Index('refresh_token', { unique: true })
    @Column({ nullable: false })
    refreshToken: string;

    /**
     * DB insert time.
     */
    @CreateDateColumn({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public createdAt: Date;

    /**
     * DB last update time.
     */
    @UpdateDateColumn({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updatedAt: Date;
}
