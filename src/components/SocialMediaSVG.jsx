export default function SocialMediaSVG({ href, rel, className, pathD }) {
  return (
    <a href={href} target="_blank" rel={rel}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={className}
        viewBox="0 0 24 24"
      >
        <path d={pathD} />
      </svg>
    </a>
  );
}
