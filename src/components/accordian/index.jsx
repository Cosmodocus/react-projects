// Single selection — Open only 1 menu at a time
// Multiple selection — Open all at once

import { useState } from "react"
import data from "./data";
import './styles.css';

export default function Accordian(){

    // we need a state for single selection
    const[selected, setSelected] = useState(null);
    //  we need a state to enable selecting multiple items
    const[enableMultiSelect, setEnableMultiSelect] = useState(false);
    //  we need a state to store the id of the multi selected items into an array. This will be used to check if enableMultiSelect is true, which we can toggle through an onClick button.
    const[multiple, setMultiple] = useState([]);

    // we create a function for single selection with an argument that will be the current id
    function handleSelected(getCurrentId){
        setSelected(getCurrentId === selected ? null : getCurrentId)
        // we pass in our state function with the current id. To allow is to close the items when selected again, we check to see if the currentId and the selected variable is true. If so, null which will close the item. Else, open the item with getCurrentId.
    }

    // if we are enabling multi select, then we are going to need a handle multi select function. It will also have an argument of the current id.
    function handleMultiSelected(getCurrentId){
        // we put our multiple array into a different variable to prevent mutation of the orginal data. The spread operator handles this for us
        let cpyMultiple = [...multiple];
        // we create a variable to help us find the index within our multiple array. When logged, we get -1.
        const findIndex = cpyMultiple.indexOf(getCurrentId);

        if(findIndex === -1){
            // if the index is -1, we will push our currentid into the multiple array. This is because the array is empty, and our items have not been selected
            cpyMultiple.push(getCurrentId);
        }else{
            // otherwise, we will remove 1 item. This is so that any id removed will remain removed until clicked again
            cpyMultiple.splice(findIndex, 1);
        }

        setMultiple(cpyMultiple);
        // we will pass in our array into our setter function.
    }

    console.log(selected, multiple);

   return(
    <div className="wrapper">
        <button
        // Reminder that we use an arrow function because any function with parentheses is always called immediately. We don't want that, we want it called when we click it, so that is what the arrow function is for.
        onClick={()=>setEnableMultiSelect(!enableMultiSelect)}
        >
            Enable Multi Selection
        </button>
        <div className="accordian">
            {
                // we do this for error handling & edge casing. It's a good practice when using external APIs. As long as the data array and the length of the data array is greater than 0, we will map out its properties. Otherwise, a div that says no data found.
                data && data.length > 0 
                ?
                // map out every dataItem within the data array as a div with a class of item, along with the key of the id. We will be using props to manage our data dynamically.
                    data.map(dataItem => 
                    <div className="item" key={dataItem.id}>
                        {/* within every item div, we will have a div with an onclick funtion. We conditionally render the click to check if enableMultiSelect is true. If so, handle the multi select logic, otherwise, we are only selecting a single item. */}
                        <div
                             onClick=
                            //  Once again, arrow function because otherwise, the function will be called immediately.
                             {
                                enableMultiSelect
                                ? ()=>handleMultiSelected(dataItem.id)
                                : ()=>handleSelected(dataItem.id)
                            }
                         >
                            {/* our questions within each item div. */}
                            <h3 className="title">
                                {dataItem.question}
                            </h3>
                            <span>+</span>
                        </div>
                        {
                            // if multiselect button is activated, we will check that our multiple array doesn't have an id of -1. If so our answer divs will render. Otherwise, we will check if the selected value is equal to the id, and if so, we will render our answer div according to that id selected. 
                            enableMultiSelect
                            ?
                            multiple.indexOf(dataItem.id) !== -1 &&
                            (<div className="content">
                                {dataItem.answer}
                            </div>)
                            :
                            selected === dataItem.id && 
                            (<div className="content">
                                {dataItem.answer}
                            </div>)
                        }
                    </div>)
                : <div>No Data Found</div>
            }
        </div>
    </div>
   )
}