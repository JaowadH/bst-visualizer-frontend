export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #eee', padding: '1rem' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', fontSize: 12, color: '#666' }}>
        © {new Date().getFullYear()} BST Visualizer • Backend on Render • Frontend on Firebase Hosting
      </div>
    </footer>
  )
}