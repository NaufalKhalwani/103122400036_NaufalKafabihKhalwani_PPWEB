const { useEffect, useState } = React;

function RegistrationApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scenario, setScenario] = useState('success');
  const [reloadKey, setReloadKey] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postResult, setPostResult] = useState(null);
  const [postError, setPostError] = useState('');
  const [requestInfo, setRequestInfo] = useState('Menyiapkan request GET...');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const scenarios = {
      success: { label: 'Berhasil', url: '/api/users?delay=1000', timeout: 5000 },
      empty: { label: 'Data kosong', url: '/api/users?mode=empty&delay=1000', timeout: 5000 },
      error: { label: 'Error HTTP', url: '/api/users?mode=error&delay=1000', timeout: 5000 },
      timeout: { label: 'Timeout', url: '/api/users?delay=2500', timeout: 700 },
    };
    const selected = scenarios[scenario];
    setLoading(true);
    setError('');
    setUsers([]);
    setRequestInfo(`Memuat skenario ${selected.label}...`);

    axios.get(selected.url, { timeout: selected.timeout, signal: controller.signal })
      .then(response => {
        if (!active) return;
        if (!Array.isArray(response.data)) throw new Error('Format data peserta tidak valid.');
        setUsers(response.data);
        setRequestInfo(`GET berhasil · HTTP ${response.status} · ${response.data.length} peserta`);
      })
      .catch(err => {
        if (!active || axios.isCancel(err) || err.code === 'ERR_CANCELED') return;
        if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
          setError(`Request timeout setelah ${selected.timeout} ms. Silakan pilih skenario lain atau muat ulang.`);
          setRequestInfo('GET gagal · Timeout');
        } else if (err.response) {
          setError(`Request gagal dengan HTTP ${err.response.status}: ${err.response.data?.message || err.response.statusText || 'Kesalahan server'}`);
          setRequestInfo(`GET gagal · HTTP ${err.response.status}`);
        } else {
          setError(`Tidak dapat terhubung ke server: ${err.message}`);
          setRequestInfo('GET gagal · Gangguan jaringan');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [scenario, reloadKey]);

  async function handleSubmit(event) {
    event.preventDefault();
    setPostResult(null);
    setPostError('');
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName) {
      setPostError('Nama wajib diisi dan tidak boleh hanya berisi spasi.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setPostError('Format email belum valid. Contoh: nama@example.com.');
      return;
    }

    setSubmitting(true);
    try {
      const objekData = { name: cleanName, email: cleanEmail };
      const response = await axios.post('/api/users', objekData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
      });
      setPostResult({ status: response.status, ...response.data });
      setName('');
      setEmail('');
    } catch (err) {
      if (err.response) setPostError(`Pendaftaran gagal (HTTP ${err.response.status}): ${err.response.data?.message || 'Periksa data.'}`);
      else if (err.code === 'ECONNABORTED') setPostError('Pengiriman melewati batas waktu. Silakan coba lagi.');
      else setPostError(`Gangguan saat mengirim pendaftaran: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid">
      <section className="card">
        <h2>Daftar peserta</h2>
        <p className="muted">Data diambil otomatis ketika halaman dibuka atau skenario diganti.</p>
        <label className="field" htmlFor="scenario">Skenario GET</label>
        <select id="scenario" value={scenario} onChange={event => setScenario(event.target.value)}>
          <option value="success">Berhasil</option>
          <option value="empty">Data kosong</option>
          <option value="error">Error HTTP</option>
          <option value="timeout">Timeout</option>
        </select>
        <div className="actions"><button className="btn" type="button" onClick={() => setReloadKey(value => value + 1)} disabled={loading}>Muat ulang</button></div>
        <p className={`status ${error ? 'error' : loading ? '' : 'success'}`} role="status">{loading ? 'Memuat daftar peserta...' : error || requestInfo}</p>
        {loading ? <div className="loading">Menghubungi API lokal...</div> : error ? <div className="empty">Daftar tidak dapat ditampilkan karena request gagal.</div> : users.length === 0 ? <div className="empty">Belum ada peserta pada skenario ini.</div> : <div className="user-list">{users.map(user => <article className="user" key={user.id}><strong>{user.name}</strong><span>{user.email}</span></article>)}</div>}
        <p className="hint">Timeout menggunakan batas 700 ms, sedangkan response server dijeda selama 2.500 ms.</p>
      </section>

      <section className="card">
        <h2>Form pendaftaran</h2>
        <p className="muted">Kirim data peserta menggunakan Axios POST.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className="field" htmlFor="name">Nama</label>
          <input id="name" value={name} onChange={event => setName(event.target.value)} placeholder="Contoh: Rina Praktikan" autoComplete="name" />
          <label className="field" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="rina@example.com" autoComplete="email" />
          <div className="actions"><button className="btn" type="submit" disabled={submitting}>{submitting ? 'Mengirim...' : 'Kirim pendaftaran'}</button></div>
        </form>
        {postError && <p className="status error" role="alert">{postError}</p>}
        {postResult && <div className="result" aria-live="polite"><h3>Response POST berhasil</h3><dl><dt>Status HTTP</dt><dd>{postResult.status}</dd><dt>ID</dt><dd>{postResult.id}</dd><dt>Nama</dt><dd>{postResult.name}</dd><dt>Email</dt><dd>{postResult.email}</dd><dt>Simulated</dt><dd>{String(postResult.simulated)}</dd></dl><p className="status success">Simulasi berhasil, data tidak disimpan.</p></div>}
        {!postResult && !postError && <p className="hint">Response POST ditampilkan terpisah dan tidak menambahkan peserta ke daftar GET.</p>}
      </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegistrationApp />);
