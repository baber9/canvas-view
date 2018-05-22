// Art work sequelize model

module.exports = (sequelize, DataTypes) => {
    var Art = sequelize.define("Art", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        art_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 149]
            }
        },
        artist_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 149]
            }
        },
        image_url: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 149]
            }
        },
        museum_name: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zipcode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true
    });
    return Art;
}

