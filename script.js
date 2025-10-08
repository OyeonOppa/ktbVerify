const API_URL = "https://script.google.com/macros/s/AKfycbyH4NaMhjn-aeG1prpLvALNfRI3DJNgFY9s9of45sIvOGbTOiZAn_bVsqB-WPfTz6nX/exec";

const input = document.getElementById('type');
const resultDiv = document.getElementById('result');

let timeout = null;

input.addEventListener('input', () => {
  clearTimeout(timeout);
  const query = input.value.trim();

  if (!query) {
    resultDiv.innerHTML = '';
    return;
  }

  // debounce 300ms
  timeout = setTimeout(async () => {
    resultDiv.innerHTML = `<div class="text-center text-muted">⏳ กำลังค้นหาข้อมูล...</div>`;
    try {
      const res = await fetch(`${API_URL}?companyName=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        const html = data.data.map(item => `
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
  }, 300);
});
