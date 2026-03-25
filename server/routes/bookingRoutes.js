const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { Op } = require('sequelize');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { sendBookingConfirmation } = require('../utils/emailService');

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID_HERE',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_RAZORPAY_KEY_SECRET_HERE',
});

// @desc    Get booking stats
// @route   GET /api/bookings/stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
    try {
        const total = await Booking.count();
        const confirmed = await Booking.count({ where: { status: 'confirmed' } });
        const rejected = await Booking.count({ where: { status: 'rejected' } });

        // Unique customers by email
        const uniqueCustomers = await Booking.count({
            distinct: true,
            col: 'email'
        });

        res.json({
            total,
            confirmed,
            rejected,
            uniqueCustomers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create razorpay order
// @route   POST /api/bookings/create-order
// @access  Public
router.post('/create-order', async (req, res) => {
    try {
        const { sport, date, slot } = req.body;
        
        // Verify slot is free first
        const existingBooking = await Booking.findOne({ 
            where: { 
                date, 
                slot, 
                sport,
                status: { [Op.ne]: 'rejected' }
            } 
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Slot already booked' });
        }

        let amountInRs = 600; // default Badminton/Other
        if (sport === "Turf Football") amountInRs = 1200;

        const options = {
            amount: amountInRs * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
         console.error('[API] POST /create-order error:', error);
         res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
router.post('/', async (req, res) => {
    try {
        console.log('[API] POST /bookings - Body:', req.body);
        const { name, phone, email, sport, date, slot, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!name || !phone || !email || !sport || !date || !slot || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            console.log('[API] Missing fields');
            return res.status(400).json({ message: 'Missing required fields including payment details' });
        }

        // Verify Signature
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_RAZORPAY_KEY_SECRET_HERE')
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Check availability (ignore rejected bookings)
        const existingBooking = await Booking.findOne({ 
            where: { 
                date, 
                slot, 
                sport,
                status: { [Op.ne]: 'rejected' }
            } 
        });

        if (existingBooking) {
            console.log('[API] Slot already booked');
            return res.status(400).json({ message: 'Slot already booked' });
        }

        // Determine amount based on sport
        let amount = 600;
        if (sport === "Turf Football") amount = 1200;

        const booking = await Booking.create({
            name,
            phone,
            email,
            sport,
            date,
            slot,
            status: 'confirmed',
            amount: amount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        });

        // Send confirmation email asynchronously
        sendBookingConfirmation(booking);

        console.log('[API] Booking created successfully');
        res.status(201).json(booking);
    } catch (error) {
        console.error('[API] POST error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all bookings (or filter by date/range)
// @route   GET /api/bookings
// @access  Public (or Admin)
router.get('/', async (req, res) => {
    try {
        const { date, sport, startDate, endDate, includeRejected } = req.query;
        console.log(`[API] GET /bookings - Query: date=${date}, sport=${sport}, startDate=${startDate}, endDate=${endDate}, includeRejected=${includeRejected}`);
        
        let whereClause = {};

        if (date) {
            whereClause.date = date;
        }

        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [startDate, endDate]
            };
        }

        if (sport) {
            whereClause.sport = sport;
        }
        
        if (includeRejected !== 'true') {
            whereClause.status = { [Op.ne]: 'rejected' };
        }
            
        const bookings = await Booking.findAll({ where: whereClause });
        res.json(bookings);
    } catch (error) {
        console.error('[API] GET error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !['confirmed', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be "confirmed" or "rejected".' });
        }

        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            booking.status = status;
            await booking.save();
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            await booking.destroy();
            res.json({ message: 'Booking removed' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
