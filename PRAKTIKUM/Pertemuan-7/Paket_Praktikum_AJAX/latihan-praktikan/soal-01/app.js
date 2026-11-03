'use strict';

const announcementButton = document.getElementById('loadAnnouncement');
const announcementStatus = document.getElementById('announcementStatus');
const announcementOutput = document.getElementById('announcementOutput');
const usersButton = document.getElementById('loadUsers');
const usersStatus = document.getElementById('usersStatus');
const usersOutput = document.getElementById('usersOutput');
const sourceSelect = document.getElementById('source');

// Nilai lokal dibuat sekali saat halaman dibuka, tidak di-reset oleh request AJAX.
const firstOpenedAt = new Date();
document.getElementById('openedAt').textContent = firstOpenedAt.toLocaleString('id-ID');
let count = 0;
document.getElementById('countButton').addEventListener('click', () => {
  count += 1;
  document.getElementById('count').textContent = String(count);
});

announcementButton.addEventListener('click', () => {
  announcementButton.disabled = true;
  announcementStatus.className = 'status';
  announcementStatus.textContent = 'Memuat pengumuman...';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'pengumuman.txt', true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      announcementOutput.textContent = xhr.responseText;
      announcementStatus.className = 'status success';
      announcementStatus.textContent = `Pengumuman berhasil dimuat (HTTP ${xhr.status}).`;
    } else {
      announcementOutput.textContent = 'Pengumuman belum dapat ditampilkan.';
      announcementStatus.className = 'status error';
      announcementStatus.textContent = `Gagal memuat pengumuman. HTTP ${xhr.status || 'tidak diketahui'}. Periksa file dan server.`;
    }
    announcementButton.disabled = false;
  };
  xhr.onerror = () => {
    announcementOutput.textContent = 'Pengumuman belum dapat ditampilkan.';
    announcementStatus.className = 'status error';
    announcementStatus.textContent = 'Gangguan jaringan saat memuat pengumuman.';
    announcementButton.disabled = false;
  };
  xhr.send();
});

usersButton.addEventListener('click', async () => {
  const external = sourceSelect.value === 'external';
  const sourceName = external ? 'JSONPlaceholder' : 'Mock lokal';
  const url = external
    ? 'https://jsonplaceholder.typicode.com/users'
    : '/api/users?delay=1500';
  usersButton.disabled = true;
  usersStatus.className = 'status';
  usersStatus.textContent = `Memuat data dari ${sourceName}...`;
  usersOutput.textContent = 'Sedang mengambil data peserta...';
  document.getElementById('sourceName').textContent = `Sumber: ${sourceName}`;
  document.getElementById('dataCount').textContent = 'Memuat...';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Server merespons HTTP ${response.status}.`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Format response API tidak sesuai (array peserta diharapkan).');
    const displayedUsers = data.slice(0, 3);
    usersOutput.replaceChildren();
    if (displayedUsers.length === 0) {
      usersOutput.textContent = 'Belum ada peserta pada sumber data ini.';
    } else {
      const list = document.createElement('div');
      list.className = 'user-list';
      displayedUsers.forEach(user => {
        const item = document.createElement('div');
        item.className = 'user';
        const name = document.createElement('strong');
        name.textContent = user.name ?? 'Nama tidak tersedia';
        const email = document.createElement('span');
        email.textContent = user.email ?? 'Email tidak tersedia';
        item.append(name, email);
        list.append(item);
      });
      usersOutput.append(list);
    }
    document.getElementById('dataCount').textContent = `${displayedUsers.length} data ditampilkan`;
    usersStatus.className = 'status success';
    usersStatus.textContent = `Request ${sourceName} berhasil (HTTP ${response.status}).`;
  } catch (error) {
    usersOutput.textContent = 'Data peserta gagal dimuat.';
    document.getElementById('dataCount').textContent = '0 data ditampilkan';
    usersStatus.className = 'status error';
    usersStatus.textContent = external
      ? `Gagal mengakses JSONPlaceholder: ${error.message} Periksa internet atau pilih Mock lokal secara manual.`
      : `Gagal mengambil data: ${error.message}`;
  } finally {
    usersButton.disabled = false;
  }
});
