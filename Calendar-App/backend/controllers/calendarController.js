const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client"); // Use PrismaClient, not just @prisma/client
const transporter = require("../helper/transporter");
const moment = require("moment");
const prisma = new PrismaClient();

const validateEvent = [
  body('event_name').trim().isLength({ min: 4, max: 30 }).withMessage('Event name must be between 4 and 30 characters long!').escape(),
  body('event_color').trim().isLength({ min: 4 }).withMessage('Please choose event color!').escape(),
  body('start').isISO8601().withMessage('Start date must be a valid date!').toDate(),
  body('end').isISO8601().withMessage('End date must be a valid date!').toDate(),
  body('event_description').trim().isLength({ min: 30 }).withMessage('Event description must be at least 30 characters long!').escape(),
  body('type').isIn(['event', 'meeting']).withMessage('Type must be either "event" or "meeting".'),

  // Conditional validation for meeting_link and optional email_addresses
  body('email_addresses').if(body('type').equals('meeting'))
    .optional().isArray().withMessage('Email addresses must be an array!'),
  body('email_addresses.*').if(body('type').equals('meeting') && body('email_addresses').exists())
    .isEmail().withMessage('Each email address must be valid!'),
  body('meeting_link').if(body('type').equals('meeting')).isURL().withMessage('Meeting link must be a valid URL!'),
];

exports.createEvent = [
  ...validateEvent,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    const { created_by, event_name, event_color, start, end, event_description, type, email_addresses, meeting_link } = req.body;

    // Validate that start date is before end date
    if (new Date(start) > new Date(end)) {
      return res.status(400).json({ message: "Start date cannot be after end date!" });
    }

    const eventData = {
      created_by,
      event_name,
      event_color,
      start,
      end,
      event_description,
      type,
      email_addresses: type === 'meeting' ? email_addresses || [] : [],
      meeting_link: type === 'meeting' ? meeting_link : null
    };

    try {
      // Create the event
      await prisma.event.create({ data: eventData });

      // Send meeting notification emails if it's a meeting and email_addresses are provided
      if (type === 'meeting' && email_addresses && email_addresses.length > 0) {

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: email_addresses, // Array of email addresses
          subject: `Meeting Scheduled: ${event_name}`,
          html: `
            <p>You have been invited to a meeting.</p>
            <p><strong>Meeting Link:</strong> <a href="${meeting_link}">${meeting_link}</a></p>
            <p><strong>Start:</strong> ${moment.utc(start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
            <p><strong>End:</strong> ${moment.utc(start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
            <p>Please join the meeting on time.</p>
          `,
        };

        // Send email to all recipients
        await transporter.sendMail(mailOptions);
      }

      const successMessage = type === 'meeting' ? "Meeting scheduled successfully." : "Event created successfully.";
      res.status(200).json({ message: successMessage });
    } catch (error) {
      console.error("Error creating event or sending emails:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.getEvents = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  
  // Ensure id is a number
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const events = await prisma.event.findMany({
      where: { created_by: userId }
    });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};


exports.getEvent = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters

  // Ensure id is a number
  const eventId = parseInt(id, 10);

  if (isNaN(eventId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId }, 
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

exports.editEvent = [
  ...validateEvent,
  async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    // Validate that start date is before end date
    if (new Date(updateData.start) > new Date(updateData.end)) {
      return res.status(400).json({ message: "Start date cannot be after end date!" });
    }

    try {
      await prisma.event.update({
        where: { id: parseInt(id) }, data: updateData
      });

      // Send meeting notification emails if it's a meeting and email_addresses are provided
      if (updateData?.type === 'meeting' && updateData?.email_addresses && updateData?.email_addresses.length > 0) {

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: updateData?.email_addresses, // Array of email addresses
          subject: `Meeting Scheduled: ${updateData?.event_name}`,
          html: `
              <p>You have been invited to a meeting.</p>
              <p><strong>Meeting Link:</strong> <a href="${updateData?.meeting_link}">${updateData?.meeting_link}</a></p>
                <p><strong>Start:</strong> ${moment.utc(updateData?.start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
            <p><strong>End:</strong> ${moment.utc(updateData?.start).format("dddd, MMMM Do YYYY, h:mm a")}</p>
              <p>Please join the meeting on time.</p>
            `,
        };

        // Send email to all recipients
        await transporter.sendMail(mailOptions);
      }

      const successMessage = updateData?.type === 'meeting' ? "Meeting updated successfully." : "Event updated successfully.";
      res.status(200).json({ message: successMessage });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
