function Myselect({options, defaultValue, value, onChange}) {
  return (
    <select style={{margin: "20px", background: "transparent", color: "white", padding: "10px", cursor: "pointer"}}
      value={value} 
      onChange={event => onChange(event.target.value)}>
          <option disabled value="">{defaultValue}</option>
          {options.map((option,i) => 
            <option style={{color: "black", padding: "10px"}} key={i} value={option.value}>
              {option.name}
            </option>)}
    </select>
  )
}

export default Myselect;