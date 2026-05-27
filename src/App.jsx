import { useState, useEffect, useRef } from 'react'
import './App.css'

const API_URL = 'http://localhost:8000'

const MOTIVATIONAL_MESSAGES = [
  '🌱 Planting seeds of positivity...',
  '☀️ Finding the sunshine in your words...',
  '🦋 Transforming your perspective...',
  '🌈 Painting a brighter picture...',
  '💫 Discovering hidden strengths...',
  '🕊️ Releasing negativity, embracing light...',
  '🌸 Blooming new possibilities...',
  '✨ Sprinkling some magic on your thoughts...',
]

const FLOATING_EMOJIS = ['🌻', '✨', '💛', '🌟', '🦋', '🌈', '💫', '🌸', '☀️', '🕊️', '💖', '🌿']

function App() {
  const [name, setName] = useState('')
  const [negativeThought, setNegativeThought] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const loadingRef = useRef(null)

  // Fetch showable thoughts on load
  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true)
      const res = await fetch(`${API_URL}/showable`)
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err)
    } finally {
      setLoadingTestimonials(false)
    }
  }

  // Cycle motivational messages while loading
  useEffect(() => {
    if (!loading) return
    setMessageIndex(0)
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MOTIVATIONAL_MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [loading])

  // Scroll to loading animation when it appears
  useEffect(() => {
    if (loading && loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !negativeThought.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(`${API_URL}/positive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          negative_thought: negativeThought.trim(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data)
        fetchTestimonials()
        setName('')
        setNegativeThought('')
      } else {
        console.error('API error:', res.status)
      }
    } catch (err) {
      console.error('Failed to submit thought:', err)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const testimonialCountClass = testimonials.length > 4 ? 'count-many' : `count-${testimonials.length}`

  return (
    <div className="app">
      {/* ===== HERO ===== */}
      <section className="hero">
        <span className="hero-emoji">🌻</span>
        <h1>
          Transform Negativity into{' '}
          <span className="highlight">Positivity</span>
        </h1>
        <p>
          Share what's weighing you down, and let AI help you see
          the brighter side. Every thought can be reframed — let's start yours.
        </p>
      </section>

      {/* ===== FORM ===== */}
      <section className="form-section">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>✍️ Share Your Thought</h2>
          <p className="subtitle">We'll turn it into something beautiful.</p>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="negative-thought">Your Negative Thought</label>
            <textarea
              id="negative-thought"
              placeholder="e.g. I feel like I'll never be good enough..."
              value={negativeThought}
              onChange={(e) => setNegativeThought(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            <span className="btn-content">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Transforming...
                </>
              ) : (
                '🌟 Transform My Thought'
              )}
            </span>
          </button>
        </form>
      </section>

      {/* ===== LOADING ANIMATION ===== */}
      {loading && (
        <section className="loading-section" ref={loadingRef}>
          <div className="loading-card">
            {/* Floating emoji particles */}
            <div className="floating-emojis">
              {FLOATING_EMOJIS.map((emoji, i) => (
                <span
                  key={i}
                  className="floating-emoji"
                  style={{
                    '--delay': `${i * 0.4}s`,
                    '--x-start': `${10 + Math.random() * 80}%`,
                    '--x-drift': `${(Math.random() - 0.5) * 60}px`,
                    '--duration': `${2.5 + Math.random() * 2}s`,
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            {/* Central pulsing orb */}
            <div className="loading-orb">
              <div className="orb-inner">🌟</div>
              <div className="orb-ring"></div>
              <div className="orb-ring orb-ring-2"></div>
            </div>

            {/* Motivational message */}
            <p className="loading-message" key={messageIndex}>
              {MOTIVATIONAL_MESSAGES[messageIndex]}
            </p>

            {/* Progress shimmer bar */}
            <div className="loading-progress">
              <div className="loading-progress-bar"></div>
            </div>
          </div>
        </section>
      )}

      {/* ===== RESULT ===== */}
      {result && (
        <section className="result-section">
          <div className="result-card">
            <div className="result-label">
              <span className="dot"></span>
              Positive Transformation
            </div>
            <p className="positive-text">{result.positive_thought}</p>
            <p className="original-text">
              Original: <span>{result.negative_thought}</span>
            </p>
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-divider">
            <span className="line"></span>
            <span className="icon">💛</span>
            <span className="line"></span>
          </div>
          <h2>Community Positivity Wall</h2>
          <p>See how others have transformed their thoughts</p>
        </div>

        {loadingTestimonials ? (
          <div className="empty-state">
            <p>Loading thoughts...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className={`testimonials-grid ${testimonialCountClass}`}>
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="card-header">
                  <div className="avatar">{getInitials(t.name)}</div>
                  <div>
                    <div className="card-name">{t.name}</div>
                    <div className="card-date">{formatDate(t.created_at)}</div>
                  </div>
                </div>
                <p className="negative">{t.negative_thought}</p>
                <p className="positive">{t.positive_thought}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-emoji">🌱</div>
            <p>No positive thoughts yet — be the first to plant one!</p>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        Made with 💛 — Positivity App
      </footer>
    </div>
  )
}

export default App
