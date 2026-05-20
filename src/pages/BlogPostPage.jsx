import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/menuData.js'
import PageTransition from '../components/PageTransition.jsx'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  const related = blogPosts.filter((p) => p.slug !== slug)

  useEffect(() => {
    document.title = post ? `Qitchen | ${post.title}` : 'Qitchen | Post Not Found'
  }, [post])

  if (!post) {
    return (
      <PageTransition>
        <div className="not-found">
          <h1>404</h1>
          <p>Post not found</p>
          <Link to="/blog" className="hero-cta">Back to Blog</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Link to="/blog" className="post-back-link">← Back to Blog</Link>

      {/* Hero */}
      <div className="post-hero">
        <img className="post-hero-img" src={post.image} alt={post.title} />
        <div className="post-hero-overlay" />
        <div className="post-hero-content">
          <h1 className="post-hero-title">{post.title}</h1>
          <span className="post-hero-date">{post.date}</span>
        </div>
      </div>

      {/* Article */}
      <article className="post-article">
        <section className="post-section">
          <h2 className="post-section-title">{post.detailTitle}</h2>
          <p className="post-section-body">{post.detailBody}</p>
        </section>
        <section className="post-section">
          <h2 className="post-section-title">{post.detailTitleTwo}</h2>
          <p className="post-section-body">{post.detailBodyTwo}</p>
        </section>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="related-posts">
          <h3>Related Articles</h3>
          <div className="related-posts-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="related-post-card">
                <img src={r.image} alt={r.title} loading="lazy" />
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  )
}
