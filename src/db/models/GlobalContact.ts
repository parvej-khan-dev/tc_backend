// models/globalContact.js
import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';



class GlobalContact extends Model {
  public id!: number;
  public name!: string;
  public phone_number!: string;
}


export interface GlobalContactInput extends Optional<GlobalContact, 'id'> {}
export interface GlobalContactOutput extends Required<GlobalContact> {}

GlobalContact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'global_contacts',
    timestamps: false,
  }
);

export default GlobalContact;
