// ==================== Supabase Config ====================
const supabaseUrl = "https://sojmbapgroetsgplshse.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvam1iYXBncm9ldHNncGxzaHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzU4NzksImV4cCI6MjA3MjA1MTg3OX0.30hi6wuhjU0fcusAQLZbgBgw8z2UlOzRvMEXmIHX7hU"; // pakai anon public key
const { createClient } = supabase;
const db = createClient(supabaseUrl, supabaseKey);

// ==================== DOM ====================
const formTransaksi = document.getElementById('formTransaksi');
const tabelTransaksi = document.getElementById('tabelTransaksi');
const saldoEl = document.getElementById('saldo');
const totalPemasukanEl = document.getElementById('totalPemasukan');
const totalPengeluaranEl = document.getElementById('totalPengeluaran');
const ctx = document.getElementById('chartKeuangan').getContext('2d');

let transaksiList = [];
let editId = null;

// ==================== Chart ====================
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      { label: 'Pemasukan', data: [], backgroundColor: 'rgba(59,130,246,0.7)' },
      { label: 'Pengeluaran', data: [], backgroundColor: 'rgba(239,68,68,0.7)' }
    ]
  },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

// ==================== Format Rupiah ====================
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(angka);
}

// ==================== Fetch & Update ====================
async function fetchTransaksi() {
  const { data, error } = await db.from('transaksi').select('*').order('created_at', {ascending:false});
  if(error) return alert("Gagal ambil data: "+error.message);

  transaksiList = data.map(d => ({
    id: d.id,
    deskripsi: d.deskripsi,
    nominal: d.jumlah,
    tipe: d.tipe,
    created_at: d.created_at
  }));

  updateDashboard();
  updateTabel();
  updateChart();
}

function updateDashboard() {
  const totalPemasukan = transaksiList.filter(t=>t.tipe==='pemasukan').reduce((a,b)=>a+b.nominal,0);
  const totalPengeluaran = transaksiList.filter(t=>t.tipe==='pengeluaran').reduce((a,b)=>a+b.nominal,0);

  saldoEl.textContent = formatRupiah(totalPemasukan-totalPengeluaran);
  totalPemasukanEl.textContent = formatRupiah(totalPemasukan);
  totalPengeluaranEl.textContent = formatRupiah(totalPengeluaran);
}

function updateTabel() {
  tabelTransaksi.innerHTML = '';
  transaksiList.forEach(t=>{
    const tanggal = t.created_at ? new Date(t.created_at).toLocaleDateString('id-ID') : '-';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-4 py-2 border">${t.deskripsi}</td>
      <td class="px-4 py-2 border">${formatRupiah(t.nominal)}</td>
      <td class="px-4 py-2 border">
        <span class="px-2 py-1 rounded-full text-white ${t.tipe==='pemasukan'?'bg-green-500':'bg-red-500'}">${t.tipe}</span>
      </td>
      <td class="px-4 py-2 border">${tanggal}</td>
      <td class="px-4 py-2 border aksi">
        <button onclick="editTransaksi('${t.id}')" class="text-blue-500 hover:underline mr-2">Edit</button>
        <button onclick="hapusTransaksi('${t.id}')" class="text-red-500 hover:underline">Hapus</button>
      </td>
    `;
    tabelTransaksi.appendChild(row);
  });
}

function updateChart() {
  chart.data.labels = transaksiList.map(t=>t.deskripsi);
  chart.data.datasets[0].data = transaksiList.map(t=>t.tipe==='pemasukan'?t.nominal:0);
  chart.data.datasets[1].data = transaksiList.map(t=>t.tipe==='pengeluaran'?t.nominal:0);
  chart.update();
}

// ==================== CRUD ====================
async function tambahTransaksi(deskripsi, nominal, tipe){
  const tanggal = new Date().toISOString(); // YYYY-MM-DDTHH:MM:SSZ

  if(editId){
    const { error } = await db.from('transaksi')
      .update({ deskripsi, jumlah: nominal, tipe, tanggal })
      .eq('id', editId);
    if(error) return alert("Gagal update: "+error.message);
    alert("✅ Data berhasil diupdate!");
    editId = null;
  } else {
    const { data, error } = await db.from('transaksi')
      .insert([{ deskripsi, jumlah: nominal, tipe, tanggal }]);
    if(error) return alert("Gagal simpan: "+error.message);
    alert("✅ Data berhasil disimpan!");
  }

  formTransaksi.reset();
  fetchTransaksi();
}

window.hapusTransaksi = async function(id){
  if(!confirm("Yakin hapus transaksi ini?")) return;
  const { error } = await db.from('transaksi').delete().eq('id', id);
  if(error) return alert("Gagal hapus: "+error.message);
  alert("✅ Data berhasil dihapus!");
  fetchTransaksi();
}

window.editTransaksi = function(id){
  const t = transaksiList.find(x=>x.id===id);
  if(!t) return;
  document.getElementById('deskripsi').value = t.deskripsi;
  document.getElementById('nominal').value = t.nominal;
  document.getElementById('tipe').value = t.tipe;
  editId = id;
  formTransaksi.querySelector('button').textContent = 'Update';
}

// ==================== Event Form ====================
formTransaksi.addEventListener('submit', e=>{
  e.preventDefault();
  const deskripsi = document.getElementById('deskripsi').value.trim();
  const nominal = Number(document.getElementById('nominal').value);
  const tipe = document.getElementById('tipe').value;

  if(!deskripsi || nominal <= 0){
    return alert("Isi deskripsi dan nominal dengan benar!");
  }

  tambahTransaksi(deskripsi, nominal, tipe);
});

// ==================== Cetak Laporan ====================
function cetakLaporan(){
  const tanggal = document.getElementById("tanggalNow").textContent;
  const saldo = document.getElementById("saldo").textContent;
  const tableEl = document.querySelector("#tabel table");
  if(!tableEl) return alert("Tidak ada data untuk dicetak!");

  const cloneTable = tableEl.cloneNode(true);
  cloneTable.querySelectorAll("th:last-child, td:last-child").forEach(el=>el.remove());

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Laporan Keuangan</title>
      <style>
        body{font-family:Arial,sans-serif;padding:20px}
        h1{text-align:center}
        .meta{margin:5px 0;font-size:16px}
        table{width:100%;border-collapse:collapse;margin-top:12px}
        th,td{border:1px solid #444;padding:6px;font-size:14px;text-align:left}
      </style>
    </head>
    <body>
      <h1>Laporan Keuangan Harian</h1>
      <div class="meta"><strong>Tanggal:</strong> ${tanggal}</div>
      <div class="meta"><strong>Saldo:</strong> ${saldo}</div>
      ${cloneTable.outerHTML}
    </body>
    </html>
  `;

  const w = window.open("", "_blank", "width=900,height=700");
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print();
}

// ==================== Tanggal ====================
function updateTanggal(){
  const today = new Date();
  const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('tanggalNow').textContent = today.toLocaleDateString('id-ID', options);
}
updateTanggal();

// ==================== Init ====================
fetchTransaksi();
