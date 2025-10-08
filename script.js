const API_URL = "https://script.google.com/macros/s/AKfycbyH4NaMhjn-aeG1prpLvALNfRI3DJNgFY9s9of45sIvOGbTOiZAn_bVsqB-WPfTz6nX/exec";

document.getElementById('checkForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value.trim();
  const resultDiv = document.getElementById('result');

  if (!type) {
    resultDiv.innerHTML = `<div class="alert alert-warning">กรุณากรอกชื่อเพื่อค้นหา</div>`;
    return;
  }

  resultDiv.innerHTML = `<div class="text-center text-muted">⏳ กำลังค้นหาข้อมูล...</div>`;

  try {
    const url = `${API_URL}?companyName=${encodeURIComponent(type)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      // แสดงผลแบบรายการทั้งหมดที่ตรงกับ search
      let html = data.data.map(item => `
        <div class="card mb-2 p-3">
          <p><strong>ชื่อบริษัท / บุคคล:</strong> ${item.company}</p>
        </div>
      `).join('');

      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger">ไม่พบข้อมูลที่ตรงกัน</div>`;
    }

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<div class="alert alert-danger">เกิดข้อผิดพลาดในการเชื่อมต่อ</div>`;
  }
});
