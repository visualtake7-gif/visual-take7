import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────── */
function Navbar({ page, setPage, user, onLogout }) {
  const [open, setOpen] = useState(false)

  const nav = (p) => { setPage(p); setOpen(false) }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => nav('home')}>
        <span>Visual</span> Take7&nbsp;🎬
      </div>

      <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>

      <div className={`navbar-links${open ? ' open' : ''}`}>
        <button className={`nav-link${page === 'home' ? ' active' : ''}`} onClick={() => nav('home')}>Home</button>
        <button className={`nav-link${page === 'portfolio' ? ' active' : ''}`} onClick={() => nav('portfolio')}>Portfólio</button>
        {user && (
          <button className={`nav-link${page === 'admin' ? ' active' : ''}`} onClick={() => nav('admin')}>Admin</button>
        )}
        {user ? (
          <button className="nav-btn nav-btn-ghost" onClick={onLogout}>Sair</button>
        ) : (
          <button className="nav-btn" onClick={() => nav('login')}>Entrar</button>
        )}
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────────── */
function HomePage({ setPage }) {
  const services = [
    { icon: '🎬', name: 'Produção de Vídeo', desc: 'Do conceito ao corte final — histórias que capturam e convertem.' },
    { icon: '📷', name: 'Fotografia', desc: 'Imagens de alto impacto para marcas, produtos e eventos.' },
    { icon: '✂️', name: 'Edição & Pós-Prod.', desc: 'Color grading profissional, VFX e motion graphics de alto nível.' },
    { icon: '📡', name: 'Transmissão ao Vivo', desc: 'Streaming multicanal com qualidade broadcast para qualquer evento.' },
    { icon: '🎵', name: 'Áudio & Som', desc: 'Trilhas, foley e mixagem imersiva que fazem a diferença.' },
    { icon: '🤖', name: 'Conteúdo com IA', desc: 'Produção aumentada por inteligência artificial para escalar resultados.' },
  ]

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">Produção Audiovisual Premium</div>
          <h1 className="hero-title">
            Sua visão,<br />
            <em data-text="nossa arte.">nossa arte.</em>
          </h1>
          <p className="hero-sub">
            Transformamos ideias em experiências audiovisuais inesquecíveis.
            Vídeo, foto, live streaming e pós-produção de elite — tudo sob um mesmo teto.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPage('portfolio')}>Ver Portfólio</button>
            <button className="btn-secondary" onClick={() => setPage('login')}>Área do Cliente</button>
          </div>
          <div className="hero-stats">
            {[['200+', 'Projetos'], ['8+', 'Anos'], ['50+', 'Clientes'], ['15', 'Prêmios']].map(([n, l]) => (
              <div className="stat-card" key={l}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-strip">
        <div className="section-header">
          <div className="section-eyebrow">O que fazemos</div>
          <h2 className="section-title">Serviços <span>especializados</span></h2>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div className="service-card" key={s.name}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: 'clamp(3rem,8vw,5rem) clamp(1.5rem,5vw,4rem)', textAlign: 'center', background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          Pronto para o próximo <span className="text-purple">nível?</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
          Vamos conversar sobre o seu projeto. Sem compromisso, com muito entusiasmo.
        </p>
        <button className="btn-primary" onClick={() => setPage('portfolio')}>Explorar Portfólio →</button>
      </section>

      <Footer />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PORTFOLIO PAGE
───────────────────────────────────────────────────────────────── */
function PortfolioPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPortfolio = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('portfolio')
        .select('id, titulo, imagem')
        .order('id', { ascending: false })

      if (err) throw err
      setItems(data || [])
    } catch (e) {
      setError(e.message || 'Erro ao carregar portfólio.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPortfolio() }, [fetchPortfolio])

  return (
    <div className="page portfolio-section">
      <div className="section-header">
        <div className="section-eyebrow">Nosso trabalho</div>
        <h1 className="section-title">Portfólio <span>Visual</span></h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
          Cada projeto é uma história única — conheça as nossas.
        </p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ maxWidth: 500, margin: '0 auto 2rem' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div className="skeleton" key={i}>
              <div className="skeleton-img" />
              <div className="skeleton-body">
                <div className="skeleton-line short" />
                <div className="skeleton-line long" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="portfolio-grid">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <div className="empty-msg">Nenhum projeto no portfólio ainda.<br />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Configure sua tabela <code>portfolio</code> no Supabase e adicione projetos pela área admin.
                </span>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))
          )}
        </div>
      )}

      <Footer />
    </div>
  )
}

function PortfolioCard({ item }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div className="portfolio-card">
      <div className="portfolio-img-wrap">
        {item.imagem && !imgErr ? (
          <img
            src={item.imagem}
            alt={item.titulo || 'Projeto'}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="portfolio-img-placeholder">🎬</div>
        )}
        <div className="portfolio-overlay">
          <button className="portfolio-overlay-btn">Ver Projeto →</button>
        </div>
      </div>
      <div className="portfolio-info">
        <div className="portfolio-tag">Projeto</div>
        <div className="portfolio-title">{item.titulo || 'Sem título'}</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────────────────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      setSuccess(true)
      setTimeout(() => onLogin(data.user), 800)
    } catch (e) {
      const msg = e.message || ''
      if (msg.includes('Invalid login')) setError('E-mail ou senha incorretos.')
      else if (msg.includes('Email not confirmed')) setError('Confirme seu e-mail antes de entrar.')
      else setError(msg || 'Erro ao fazer login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🎬</div>
          <div className="auth-logo-name">Visual Take7</div>
        </div>
        <h1 className="auth-title">Bem-vindo de volta</h1>
        <p className="auth-subtitle">Acesse a área administrativa</p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {success && <div className="alert alert-success">✓ Login realizado! Redirecionando…</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          <button type="submit" className="form-btn" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   ADMIN PAGE
───────────────────────────────────────────────────────────────── */
function AdminPage({ user, setPage }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [imagem, setImagem] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('portfolio').select('*').order('id', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!titulo.trim()) { setMsg({ type: 'error', text: 'Título obrigatório.' }); return }
    setSaving(true)
    setMsg(null)
    const { error } = await supabase.from('portfolio').insert([{ titulo: titulo.trim(), imagem: imagem.trim() || null }])
    if (error) {
      setMsg({ type: 'error', text: error.message })
    } else {
      setMsg({ type: 'success', text: 'Projeto adicionado com sucesso!' })
      setTitulo('')
      setImagem('')
      fetchItems()
    }
    setSaving(false)
    setTimeout(() => setMsg(null), 3000)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remover este projeto?')) return
    const { error } = await supabase.from('portfolio').delete().eq('id', id)
    if (!error) fetchItems()
  }

  const email = user?.email || 'Administrador'

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <div className="admin-welcome">Olá, <span>{email.split('@')[0]}</span> 👋</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Gerencie o portfólio da Visual Take7
          </div>
        </div>
        <button className="btn-secondary" onClick={() => setPage('portfolio')}>← Ver Portfólio</button>
      </div>

      {/* Stats */}
      <div className="admin-grid">
        <div className="admin-stat">
          <div className="admin-stat-icon">🎬</div>
          <div className="admin-stat-value">{loading ? '—' : items.length}</div>
          <div className="admin-stat-label">Projetos</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-icon">📧</div>
          <div className="admin-stat-value" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{email}</div>
          <div className="admin-stat-label">Usuário logado</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-icon">✅</div>
          <div className="admin-stat-value">Live</div>
          <div className="admin-stat-label">Status Supabase</div>
        </div>
      </div>

      {/* Add form */}
      <div className="admin-panel" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-panel-header">
          <div className="admin-panel-title">+ Adicionar Projeto</div>
        </div>
        <div className="admin-panel-body">
          {msg && <div className={`alert alert-${msg.type}`} style={{ marginBottom: '1rem' }}>{msg.type === 'error' ? '⚠️' : '✓'} {msg.text}</div>}
          <form className="add-form" onSubmit={handleAdd}>
            <input
              className="form-input"
              placeholder="Título do projeto *"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              disabled={saving}
            />
            <input
              className="form-input"
              placeholder="URL da imagem (opcional)"
              value={imagem}
              onChange={e => setImagem(e.target.value)}
              disabled={saving}
            />
            <button type="submit" className="form-btn" disabled={saving}>
              {saving && <span className="spinner" />}
              {saving ? 'Salvando…' : 'Adicionar'}
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-panel-title">📋 Projetos Cadastrados</div>
          <button
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '0.35rem 0.75rem', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}
            onClick={fetchItems}
          >↻ Atualizar</button>
        </div>
        <div className="admin-panel-body" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              <span className="spinner" /> Carregando…
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              Nenhum projeto cadastrado ainda.
            </div>
          ) : (
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Imagem</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>#{item.id}</td>
                    <td>{item.titulo || '—'}</td>
                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {item.imagem ? (
                        <a href={item.imagem} target="_blank" rel="noreferrer" style={{ color: 'var(--purple)', textDecoration: 'none' }}>
                          {item.imagem.slice(0, 40)}…
                        </a>
                      ) : '—'}
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>Remover</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="footer-brand">Visual Take7 🎬</div>
      <div className="footer-copy">© {new Date().getFullYear()} Visual Take7. Todos os direitos reservados.</div>
      <div className="footer-socials">
        {['📸', '🎥', '💼'].map((icon, i) => (
          <a key={i} href="#" className="social-btn">{icon}</a>
        ))}
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = (loggedUser) => {
    setUser(loggedUser)
    setPage('admin')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPage('home')
  }

  // Redirect admin page if not logged in
  useEffect(() => {
    if (!authLoading && page === 'admin' && !user) setPage('login')
  }, [page, user, authLoading])

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '2rem' }}>🎬</div>
        <span className="spinner" />
      </div>
    )
  }

  return (
    <>
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />

      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'login' && !user && <LoginPage onLogin={handleLogin} />}
      {page === 'login' && user && <AdminPage user={user} setPage={setPage} />}
      {page === 'admin' && user && <AdminPage user={user} setPage={setPage} />}
    </>
  )
}
