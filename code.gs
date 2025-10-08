function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('ระบบตรวจสอบข้อมูล')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function checkData(type, taxId) {
  const ss = SpreadsheetApp.openById('1sNAbUetcC8I9K_7cy1MrP-VArrQLOPL43R5aNb9orxY'); // ใส่ ID ของชีตคุณ
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === type && data[i][3] === taxId) {
      const bankName = data[i][4] ? maskString(data[i][4]) : "-";
      const phone = data[i][8] ? maskPhone(data[i][8]) : "-";
      const reporter = data[i][10] ? maskString(data[i][10]) : "-";
      const bank = data[i][5] || "-";
      return {
        found: true,
        message: "✅ พบข้อมูลในระบบแล้ว",
        bankName,
        bank,
        phone,
        reporter,
      };
    }
  }

  return { found: false, message: "❌ ไม่พบข้อมูลในระบบ" };
}

function maskString(str) {
  if (str.length <= 2) return str;
  return str[0] + "xxx" + str[str.length - 1];
}

function maskPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return phone;
  return digits.substring(0, 3) + "-xxx-" + digits.substring(7);
}
