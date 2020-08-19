export const generateColumn = function(rows) {
  const header_style = {
    alignment: {
      vertical: "top",
      horizontal: "left",
    },
  };

  const columns = [];

  if (rows.length > 0) {
    Object.keys(rows[0]).forEach((key) => {
      if (key !== '_id') {
        columns.push({
          header: key,
          key: key,
          width: 20,
          style: header_style,
        });
      }
    });
  }

  return columns;
};

export const restyleHeader = function(worksheet) {
  const total_column = worksheet.columns.length;
  const base_char_code = "A".charCodeAt(0);
  for (let i = 0; i < total_column; ++i) {
    const current_char_code = String.fromCharCode(base_char_code + i);
    const cell = worksheet.getCell(current_char_code + "1");
    cell.font = {
      bold: true,
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB6D7A8" },
      bgColor: { argb: "FFB6D7A8" },
    };
  }
};
