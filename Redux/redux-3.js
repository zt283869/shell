
const reducer = (state=0,action)=>{
    switch (action.type){
        case "Add":
            return state+1;
        break;
        default:
            return state;
    }
}

const store  = Redux.createStore(reducer);



const Counter = ({value,Add,Sub})=>(
    <div>
        <h1>{value}</h1>
        <input type="button" value="+" onClick={Add}/>
        <input type="button" value="-" onClick={Sub}/>
    </div>
)


const main =()=>{
    ReactDOM.render(<Counter
        value={store.getState()}
        Add= {()=> store.dispatch({type:"Add"})}
    />,document.querySelector("#app"))
}


store.subscribe(main);

main();
