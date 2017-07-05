const counter = (state=0,action)=>{
    switch (action.type){
        case 'ADD':
            return state +1;
        break;
        case "SUB":
            return state-1;
        break;
        default:
            return state;
    }
}

const {createStore} = Redux;
const  store = createStore(counter);

const render = ()=>{
    document.body.innerHTML = store.getState();
}

store.subscribe(render);

document.addEventListener("click",()=>{
    store.dispatch({type:"ADD"})
})