const Filter = (props) => {
    return (
        <div>
    filter shown with <input value={props.filterText} onChange={props.handleFilterChange}/>
    </div>
    )
}

export default Filter