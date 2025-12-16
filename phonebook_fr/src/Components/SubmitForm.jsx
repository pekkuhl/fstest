
const SubmitForm = (props) => {

    return (
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleChange}/>
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default SubmitForm