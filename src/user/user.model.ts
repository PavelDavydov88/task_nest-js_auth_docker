import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCraetionAttrs {
    login: string,
    password: string,
}

@Table({tableName: 'user-docker', createdAt: false, updatedAt: false})
export class User extends Model<User, UserCraetionAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({type: DataType.STRING, unique: true})
    login: string;

    @Column({type: DataType.STRING})
    password: string;

}