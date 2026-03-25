const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

/**
 * Send booking confirmation email
 * @param {Object} bookingDetails - The details of the booking
 */
const sendBookingConfirmation = async (bookingDetails) => {
    try {
        const { name, email, sport, date, slot, amount, orderId } = bookingDetails;
        
        // Ensure email exists
        if (!email) {
            console.log('[EmailService] No email provided for booking.');
            return;
        }

        // Check if credentials are set up
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.log('[EmailService] GMAIL_USER or GMAIL_PASS not set in .env. Skipping email.');
            return;
        }

        const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });

        const mailOptions = {
            from: `"Sky Smash Courts" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Booking Confirmation - ${sport} at Sky Smash Courts`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #2e3034; color: #fff; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Sky Smash Courts</h1>
                        <p style="margin: 5px 0 0; color: #1abc9c;">Booking Confirmed!</p>
                    </div>
                    
                    <div style="padding: 20px;">
                        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; color: #333;">Thank you for booking with Sky Smash Courts. Your slot has been successfully reserved.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                            <h2 style="margin-top: 0; font-size: 18px; color: #2e3034; border-bottom: 2px solid #1abc9c; padding-bottom: 5px; display: inline-block;">Booking Details</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%;">Sport:</td>
                                    <td style="padding: 8px 0; color: #333;">${sport}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Date:</td>
                                    <td style="padding: 8px 0; color: #333;">${formattedDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Time Slot:</td>
                                    <td style="padding: 8px 0; color: #333;">${slot}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Amount Paid:</td>
                                    <td style="padding: 8px 0; color: #333;">₹${amount}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Order ID:</td>
                                    <td style="padding: 8px 0; color: #333; font-size: 12px;">${orderId || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="font-size: 14px; color: #666; background-color: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
                            <strong>Note:</strong> Please arrive 10 minutes before your scheduled slot. Carry non-marking shoes for badminton and appropriate gear.
                        </div>
                        
                        <p style="font-size: 14px; color: #555; text-align: center;">We look forward to seeing you on the court!</p>
                        <p style="font-size: 14px; color: #555; text-align: center; margin-bottom: 0;">- <em>The Sky Smash Courts Team</em></p>
                    </div>
                    
                    <div style="background-color: #f1f1f1; color: #888; text-align: center; padding: 10px; font-size: 12px;">
                        <p style="margin: 0;">This is an automated email. Please do not reply directly to this message.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Booking confirmation sent to ${email}. Message ID: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('[EmailService] Error sending email:', error);
        return false;
    }
};

module.exports = {
    sendBookingConfirmation
};
