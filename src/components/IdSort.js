function IdSort({ handleSort }) {

    //handle functions used to pass sorting technique to parent element using prop function call

    const handleASC = () => {
        handleSort('ASC')
    }
    const handleDESC = () => {
        handleSort('DESC')
    }
    return (<div className="sort-selection">
        <div onClick={handleASC}>ASC</div>
        <div onClick={handleDESC}>DESC</div>
    </div>)
}

export default IdSort;