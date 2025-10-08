const API_URL = "https://script.google.com/macros/s/AKfycbyH4NaMhjn-aeG1prpLvALNfRI3DJNgFY9s9of45sIvOGbTOiZAn_bVsqB-WPfTz6nX/exec";

document.getElementById('checkForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value.trim();
  const taxId = document.getElementById('taxId').value.trim();
  const resultDiv = document.getElementById('result');

  resultDiv.classList.remove('d-none','alert-success','alert-danger');
  resultDiv.classList.add('card', 'p-3');
  resultDiv.innerHTML = '<div class="text-center text-muted">⏳ กำลังตรวจสอบข้อมูล...</div>';

  try {
    const url = `${API_URL}?companyName=${encodeURIComponent(type)}&taxId=${encodeURIComponent(taxId)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      resultDiv.innerHTML = `
        <div class="card-header text-center">✅ ${data.message}</div>
        <div class="card-body">
          <p><strong>ชื่อบริษัท / บุคคล:</strong> <span class="masked">${data.data.company}</span></p>
          <p><strong>เลขประจำตัวผู้เสียภาษี:</strong> <span class="masked">${data.data.taxId}</span></p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="card-header text-center text-danger">❌ ${data.message}</div>
      `;
    }

  } catch (err) {
    resultDiv.innerHTML = `
      <div class="card-header text-center text-danger">เกิดข้อผิดพลาดในการเชื่อมต่อ</div>
    `;
  }
});
