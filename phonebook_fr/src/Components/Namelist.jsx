const NameList = (props) => {
    return(
        <>
            {props.persons
        .filter((p)=> p.name.toUpperCase().includes(props.filterText.toUpperCase()))
        .map((p)=> <li key={p.id}> {p.name} {p.number} <button type="submit" onClick={() => props.deleteName(p.id)}> delete </button> </li> )  } 
        </>
        )
}

export default NameList