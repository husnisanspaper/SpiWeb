import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'

const ExcelGenerator = ({ dataSkill }) => {

  const handleGenerateExcel = async () => {


        // Transform dataSkill into inputData format
        const inputData = dataSkill.flatMap((a) =>
        a.skill.map((sk) => ({
          description: sk.description,
          expiry: a.expiry ? a.expiry.replace(/"/g, '') : ''
        }))
      );


    // Create a workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Skills');

   // Add headers
   worksheet.columns = [
    { header: 'Skill', key: 'skill', width: 40 },
    { header: 'Expiry', key: 'expiry', width: 20 }
  ];
   // Add data rows
    inputData.forEach((item) => {
      worksheet.addRow({
        skill: item.description,
        expiry: item.expiry
      });
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create Blob and trigger file download
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'generated-file.xlsx');
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={handleGenerateExcel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Share/Download
      </button>
    </div>
  );
};

export default ExcelGenerator;
