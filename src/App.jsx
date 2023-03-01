import { useState } from "react"

const MainField = ({products}) => {
    const [filterText, setFilterText] = useState("");
    const [filterCheck, setFilterCheck] = useState(false);
    return (
        <>
            <SearchField 
            filterText = {filterText}
            filterCheck = {filterCheck}
            setFilterText = {setFilterText}
            setFilterCheck = {setFilterCheck}
            />
            <ProductTable 
            products={products}
            filterText = {filterText}
            filterCheck = {filterCheck}
            />
        </>
    )
}

const SearchField = ({filterText,setFilterText,setFilterCheck,filterCheck}) => {
    const handleSearch = (e) => {
        setFilterText(e.target.value)
    }

    const handleCheck = (e) => {
        setFilterCheck(e.target.value)
    }


    return  (
        <>
            <form>
                <input type="text" placeholder="Search..." value={filterText} onChange={handleSearch}/>
                <input type="checkbox" name="check" value={filterCheck} onChange={handleCheck}/>
                <label htmlFor="check">{" "}Filter Table</label>
            </form>
        </>
    )
}

const ProductTable = ({products, filterText, filterCheck}) => {
    // set empty array to store the data
    const rows = [];
    // set a variable that store the latest category
    let latestCat = '';

    // loop through data make sure the props is set
    products.forEach((p)=>{
        if (p.name.toLowerCase().indexOf(
            filterText.toLowerCase()
        )=== -1){
            return;
        }
        if (filterCheck && !p.stocked){
            return;
        }
        // condition the category if not null push the data to the empty array
        if (p.category !== latestCat){
            rows.push(
                <ProductCategory
                category = {p.category}
                key = {p.category}
                // passing props to the child components
                />
            )
            // after the push, set the latestCat to new field
            latestCat = p.category;
        };
        // next push the body data
        rows.push(
            // passing props to the child components
            <ProductData 
            product = {p}
            key = {p.name}
            />
        )
    })

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    )
}

const ProductCategory = ({category}) => {
    return (
        <>
            <tr>
                <td colSpan={2}>
                    {category}
                </td>
            </tr>
        </>
    )
}

const ProductData = ({product}) => {
    const name = product.stocked ? product.name
    :
    <span style={{color:'red'}}>{product.name}</span>

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        </>
    )
}

const App = () => {
    const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]


    return (
        <>
            <MainField products={products}/>
        </>
    )
}

export default App

// First field done for static next do the main table
