/** Kept as a simple wrapper so existing imports keep working. Sections no longer animate on scroll. */
export default function Reveal({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={className}>{children}</Tag>;
}
