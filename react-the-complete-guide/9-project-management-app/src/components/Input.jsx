export function Input({ label, textarea, ...props }) {
  return (
    <p>
      <label>{label}</label>
      {textarea ? <textarea></textarea> : <input></input>}
    </p>
  )
}
