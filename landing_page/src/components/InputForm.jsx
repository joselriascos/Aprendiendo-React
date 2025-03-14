export function InputForm({ text, type, required = false, id }) {
  return (
    <label htmlFor={id}>
      {text}
      <input type={type} id={id} required={required} />
    </label>
  )
}
