const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

const ROLES = ['USER', 'TRAINER', 'ADMIN'];

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        passwordConfirm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                confirmPassword() {
                    if (this.passwordConfirm !== this.password) {
                        throw new Error('Passwords do not match');
                    }
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'USER',
            validate: {
                checkRole(value) {
                    if (!ROLES.includes(value)) throw new Error('User role must be either "USER", "TRAINER" or "ADMIN"')
                }
            }
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
