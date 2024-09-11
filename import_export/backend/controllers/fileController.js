const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const xlsx = require('xlsx');
const multer = require('multer');
const ExcelJS = require('exceljs');
const upload = multer({ dest: 'uploads/' });

exports.addData = async (req, res) => {
    const { username, email, phone } = req.body;

    try {
        const newData = await prisma.document.create({
            data: {
                username,
                email,
                phone, 
            },
        });
        
        res.status(200).json({ success: true, data: newData });
    } catch (error) {
        console.error("Error adding data: ", error);
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.fileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON format
    const data = xlsx.utils.sheet_to_json(sheet);

    // Insert each row into the database
    for (const row of data) {
      await prisma.document.create({
        data: {
          username: row.Username,
          email: row.Email,
          phone: row.Phone ,
        },
      });
    }

    res.json({ message: 'Data uploaded and inserted into the database successfully' });
  } catch (error) {
    console.error('Error uploading or inserting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getData = async (req, res) => {
    try {
      const allFiles = await prisma.document.findMany();
      res.status(200).json(allFiles);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.downloadFileById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const document = await prisma.document.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!document) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }
  
      // Generate Excel file (or any file format)
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Document Details');
  
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Username', key: 'username', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
      ];
  
      worksheet.addRow(document);
  
      // Set headers and send file
      res.setHeader('Content-Disposition', `attachment; filename=document_${id}.xlsx`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  

exports.getSingleData = async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters

    try {
        // Fetch the single document by ID
        const document = await prisma.document.findUnique({
            where: {
                id: parseInt(id), // Ensure ID is an integer
            },
        });

        if (!document) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        res.status(200).json({ success: true, data: document });
    } catch (error) {
        console.error("Error fetching document: ", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
};
exports.downloadAllData = async (req, res) => {
  try {
      const documents = await prisma.document.findMany();

      if (documents.length === 0) {
          return res.status(404).json({ success: false, message: 'No documents found' });
      }

      // Generate Excel file
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('All Documents');

      worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
          { header: 'Username', key: 'username', width: 30 },
          { header: 'Email', key: 'email', width: 30 },
          { header: 'Phone', key: 'phone', width: 20 },
      ];

      // Add rows to the worksheet
      documents.forEach(document => {
          worksheet.addRow(document);
      });

      // Set headers and send file
      res.setHeader('Content-Disposition', 'attachment; filename=all_documents.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      await workbook.xlsx.write(res);
      res.end();
  } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
      await prisma.$disconnect();
  }
};