export function Button({ textOnly, children, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button"
  cssClasses += ` ${className}`

  return (
    <button
      {...props}
      className={cssClasses}
    >
      {children}
    </button>
  )
}
