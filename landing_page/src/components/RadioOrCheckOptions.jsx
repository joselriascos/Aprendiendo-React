export function RadioOrCheckOptions({ options, name, required, type }) {
  return options.map((option) => {
    return (
      <label key={option.id} htmlFor={option.id}>
        <input name={name} type={type} id={option.id} value={option.value} required={required}/>
        {option.text}
      </label>
    )
  })
}
