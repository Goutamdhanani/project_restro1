import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/menuData.js'
import PageTransition from '../components/PageTransition.jsx'

export default function BlogPage() {
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Qitchen | Blog'
  }, [])

  const filtered = useMemo(
    () =>
      blogPosts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  return (
    <PageTransition>
      {/* Hero */}
      <div className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80"
          alt="Camera capturing a plated fine dining course"
          loading="lazy"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="eyebrow">Journal</span>
          <h1>Blog</h1>
        </div>
      </div>

      {/* Listing */}
      <div className="blog-listing">
        <div className="blog-search">
          <input
            className="blog-search-input"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="blog-search"
          />
        </div>

        <div className="blog-grid">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-img-wrap">
                <img className="blog-card-img" src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-card-body">
                <span className="blog-card-date">{post.date}</span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-link">Read More →</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p style={{ color: 'var(--color-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>
              No articles found matching "{search}"
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
