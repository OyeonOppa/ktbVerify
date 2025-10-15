const API_URL_1 = "https://script.google.com/macros/s/AKfycbyH4NaMhjn-aeG1prpLvALNfRI3DJNgFY9s9of45sIvOGbTOiZAn_bVsqB-WPfTz6nX/exec";
const API_URL_2 = "https://script.google.com/macros/s/AKfycbzx27u9ZqDq7hf_xcaX5dzTs4n856cjE2kaF67C46WUkfCejjiquyvl7hlxfVgILCgLiA/exec"; // ใส่ URL ใหม่ที่ได้

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
    
    let allResults = [];
    
    // API ตัวที่ 1
    try {
      const res1 = await fetch(`${API_URL_1}?companyName=${encodeURIComponent(query)}`);
      const data1 = await res1.json();
      
      if (data1.success && data1.data && data1.data.length > 0) {
        allResults.push(...data1.data);
      }
    } catch (err) {
      console.error('Error from API 1:', err);
    }
    
    // API ตัวที่ 2
    try {
      const res2 = await fetch(`${API_URL_2}?companyName=${encodeURIComponent(query)}`);
      const data2 = await res2.json();
      
      if (data2.success && data2.data && data2.data.length > 0) {
        allResults.push(...data2.data);
      }
    } catch (err) {
      console.error('Error from API 2:', err);
    }

    // แสดงผลลัพธ์
    if (allResults.length > 0) {
      const html = allResults.map(item => `
        <div class="card mb-2 p-3">
          <p><strong>ชื่อบริษัท / บุคคล:</strong> ${item.company}</p>
        </div>
      `).join('');
      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger">ไม่พบข้อมูลที่ตรงกัน</div>`;
    }
  }, 300);
});