const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Store only the date part
    allowNull: false,
  },
  slot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'cancelled', 'blocked', 'rejected'),
    defaultValue: 'confirmed',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['date', 'slot', 'sport'],
      where: {
        status: ['confirmed', 'blocked'] // Only mark unique for confirmed/blocked
      }
    }
  ]
});

module.exports = Booking;
