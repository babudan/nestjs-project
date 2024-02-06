import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Contact extends Model<Contact> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    email: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phonenumber: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    postaladress: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

}