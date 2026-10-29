import { useMemo, useState } from "react";

const DATA_AWAL = [
  { id: "m-1", nama: "Ani", nim: "10121001", kelas: "TI-2A", hadir: true },
  { id: "m-2", nama: "Budi", nim: "10121002", kelas: "TI-2B", hadir: false },
  { id: "m-3", nama: "Citra", nim: "10121003", kelas: "TI-2A", hadir: false },
];

const FORM_AWAL = { nama: "", nim: "", kelas: "" };

function RingkasanPeserta({ peserta, hasilDitampilkan }) {
  const total = peserta.length;
  const hadir = peserta.filter((item) => item.hadir).length;
  const belumHadir = total - hadir;

  const ringkasan = [
    { label: "Total peserta", nilai: total, ikon: "♙", warna: "blue" },
    { label: "Hadir", nilai: hadir, ikon: "✓", warna: "green" },
    { label: "Belum hadir", nilai: belumHadir, ikon: "◷", warna: "orange" },
    { label: "Hasil ditampilkan", nilai: hasilDitampilkan, ikon: "▤", warna: "purple" },
  ];

  return (
    <section className="summary-grid" aria-label="Ringkasan peserta">
      {ringkasan.map((item) => (
        <article className="summary-card" key={item.label}>
          <div className={`summary-icon ${item.warna}`}>{item.ikon}</div>
          <div>
            <p className="summary-label">{item.label}</p>
            <p className="summary-value">{item.nilai}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function FormPeserta({ form, setForm, peserta, idEdit, onSubmit, onBatal, pesan }) {
  const sedangEdit = idEdit !== null;

  function ubahInput(event) {
    const { name, value } = event.target;
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{sedangEdit ? "MODE EDIT" : "DATA PESERTA"}</p>
          <h2>{sedangEdit ? "Ubah peserta" : "Tambah peserta"}</h2>
        </div>
        <span className="heading-icon">＋</span>
      </div>

      <form onSubmit={onSubmit} className="participant-form">
        <label>
          Nama mahasiswa
          <input
            name="nama"
            value={form.nama}
            onChange={ubahInput}
            placeholder="Contoh: Dina Putri"
            autoComplete="off"
          />
        </label>

        <label>
          NIM
          <input
            name="nim"
            value={form.nim}
            onChange={ubahInput}
            placeholder="8 digit NIM"
            inputMode="numeric"
            autoComplete="off"
          />
        </label>

        <label>
          Kelas
          <select name="kelas" value={form.kelas} onChange={ubahInput}>
            <option value="">Pilih kelas</option>
            <option value="TI-2A">TI-2A</option>
            <option value="TI-2B">TI-2B</option>
          </select>
        </label>

        {pesan && (
          <div className={`form-message ${pesan.tipe}`} role="status">
            {pesan.teks}
          </div>
        )}

        <div className="form-actions">
          <button className="button primary" type="submit">
            {sedangEdit ? "Simpan perubahan" : "Tambah peserta"}
          </button>
          {sedangEdit && (
            <button className="button secondary" type="button" onClick={onBatal}>
              Batal
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function FilterPeserta({ pencarian, setPencarian, filterKelas, setFilterKelas }) {
  return (
    <section className="filter-panel">
      <div className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Cari nama atau NIM"
          value={pencarian}
          onChange={(event) => setPencarian(event.target.value)}
          placeholder="Cari nama atau NIM..."
        />
      </div>
      <select
        aria-label="Filter kelas"
        value={filterKelas}
        onChange={(event) => setFilterKelas(event.target.value)}
      >
        <option value="Semua kelas">Semua kelas</option>
        <option value="TI-2A">TI-2A</option>
        <option value="TI-2B">TI-2B</option>
      </select>
    </section>
  );
}

function ItemPeserta({ peserta, onEdit, onHapus, onToggleHadir }) {
  return (
    <tr>
      <td>
        <div className="student-cell">
          <div className="avatar">{peserta.nama.trim().charAt(0).toUpperCase()}</div>
          <span className="student-name">{peserta.nama}</span>
        </div>
      </td>
      <td className="nim-cell">{peserta.nim}</td>
      <td><span className="class-pill">{peserta.kelas}</span></td>
      <td>
        <span className={`status-pill ${peserta.hadir ? "present" : "absent"}`}>
          <span className="status-dot" />
          {peserta.hadir ? "Hadir" : "Belum hadir"}
        </span>
      </td>
      <td>
        <div className="row-actions">
          <button className="icon-button edit" type="button" onClick={() => onEdit(peserta)} aria-label={`Edit ${peserta.nama}`} title="Edit">✎</button>
          <button className="icon-button delete" type="button" onClick={() => onHapus(peserta.id)} aria-label={`Hapus ${peserta.nama}`} title="Hapus">×</button>
          <button
            className={`button small ${peserta.hadir ? "secondary" : "success"}`}
            type="button"
            onClick={() => onToggleHadir(peserta.id)}
          >
            {peserta.hadir ? "Batalkan hadir" : "Tandai hadir"}
          </button>
        </div>
      </td>
    </tr>
  );
}

function DaftarPeserta({ peserta, onEdit, onHapus, onToggleHadir }) {
  return (
    <section className="panel list-panel">
      <div className="section-heading list-heading">
        <div>
          <p className="eyebrow">DAFTAR MAHASISWA</p>
          <h2>Peserta praktikum</h2>
        </div>
        <span className="count-pill">{peserta.length} peserta</span>
      </div>

      {peserta.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>Peserta tidak ditemukan</h3>
          <p>Coba ubah kata pencarian atau filter kelas.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nama mahasiswa</th>
                <th>NIM</th>
                <th>Kelas</th>
                <th>Kehadiran</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {peserta.map((item) => (
                <ItemPeserta
                  key={item.id}
                  peserta={item}
                  onEdit={onEdit}
                  onHapus={onHapus}
                  onToggleHadir={onToggleHadir}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [peserta, setPeserta] = useState(DATA_AWAL);
  const [form, setForm] = useState(FORM_AWAL);
  const [idEdit, setIdEdit] = useState(null);
  const [pencarian, setPencarian] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua kelas");
  const [pesan, setPesan] = useState(null);

  const pesertaTerfilter = useMemo(() => {
    const kata = pencarian.trim().toLocaleLowerCase();
    return peserta.filter((item) => {
      const cocokKata =
        item.nama.toLocaleLowerCase().includes(kata) || item.nim.includes(kata);
      const cocokKelas =
        filterKelas === "Semua kelas" || item.kelas === filterKelas;
      return cocokKata && cocokKelas;
    });
  }, [peserta, pencarian, filterKelas]);

  function resetForm() {
    setForm(FORM_AWAL);
    setIdEdit(null);
    setPesan(null);
  }

  function simpanPeserta(event) {
    event.preventDefault();
    const nama = form.nama.trim();
    const nim = form.nim.trim();
    const kelas = form.kelas;

    if (nama.length < 3) {
      setPesan({ tipe: "error", teks: "Nama wajib diisi minimal 3 karakter." });
      return;
    }
    if (!/^\d{8}$/.test(nim)) {
      setPesan({ tipe: "error", teks: "NIM harus terdiri dari tepat 8 digit angka." });
      return;
    }
    if (!kelas) {
      setPesan({ tipe: "error", teks: "Silakan pilih kelas terlebih dahulu." });
      return;
    }
    const nimDipakai = peserta.some(
      (item) => item.nim === nim && item.id !== idEdit
    );
    if (nimDipakai) {
      setPesan({ tipe: "error", teks: "NIM sudah digunakan peserta lain." });
      return;
    }

    if (idEdit !== null) {
      setPeserta((sebelumnya) =>
        sebelumnya.map((item) =>
          item.id === idEdit ? { ...item, nama, nim, kelas } : item
        )
      );
      resetForm();
      setPesan({ tipe: "success", teks: "Perubahan peserta berhasil disimpan." });
    } else {
      const idBaru = `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setPeserta((sebelumnya) => [
        ...sebelumnya,
        { id: idBaru, nama, nim, kelas, hadir: false },
      ]);
      setForm(FORM_AWAL);
      setPesan({ tipe: "success", teks: "Peserta berhasil ditambahkan." });
    }
  }

  function mulaiEdit(item) {
    setForm({ nama: item.nama, nim: item.nim, kelas: item.kelas });
    setIdEdit(item.id);
    setPesan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function batalEdit() {
    resetForm();
  }

  function hapusPeserta(id) {
    setPeserta((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
    if (idEdit === id) resetForm();
  }

  function toggleHadir(id) {
    setPeserta((sebelumnya) =>
      sebelumnya.map((item) =>
        item.id === id ? { ...item, hadir: !item.hadir } : item
      )
    );
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <div className="brand"><span className="brand-mark">P</span><span>Praktikum<span className="brand-light">Hub</span></span></div>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">PANEL ADMINISTRATOR</p>
            <h1>Manajemen Peserta<br /><span>Praktikum.</span></h1>
            <p className="hero-description">Kelola data peserta dan pantau kehadiran dalam satu tempat.</p>
          </div>
          <div className="hero-decoration decoration-one" />
          <div className="hero-decoration decoration-two" />
          <div className="hero-bottom"><span><span className="live-dot" /> Sistem pengelolaan peserta</span><span>MODUL 06 · REACT DASAR</span></div>
        </div>
      </header>

      <div className="content">
        <RingkasanPeserta peserta={peserta} hasilDitampilkan={pesertaTerfilter.length} />

        <div className="workspace">
          <FormPeserta
            form={form}
            setForm={setForm}
            peserta={peserta}
            idEdit={idEdit}
            onSubmit={simpanPeserta}
            onBatal={batalEdit}
            pesan={pesan}
          />

          <div className="list-column">
            <FilterPeserta
              pencarian={pencarian}
              setPencarian={setPencarian}
              filterKelas={filterKelas}
              setFilterKelas={setFilterKelas}
            />
            {peserta.length === 0 ? (
              <section className="panel empty-all">
                <div className="empty-icon">♙</div>
                <h3>Belum ada peserta.</h3>
                <p>Tambahkan peserta baru melalui formulir di samping.</p>
              </section>
            ) : (
              <DaftarPeserta
                peserta={pesertaTerfilter}
                onEdit={mulaiEdit}
                onHapus={hapusPeserta}
                onToggleHadir={toggleHadir}
              />
            )}
          </div>
        </div>

        <footer className="footer">
          <span>PraktikumHub <span className="footer-dot">•</span> React Dasar</span>
          <span>Dibuat dengan React + Vite</span>
        </footer>
      </div>
    </main>
  );
}