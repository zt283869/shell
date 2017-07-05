
 const reducer = (state=0,action)=>{
    switch (action.type){
        case "ADD":
            return state+1;
        default:
            return state;
            break
    }
}

 const store = Redux.createStore(reducer);


 class Counter extends React.Component {

     render(){
         return (
             <div>
                 <h1>{this.props.num}</h1>
                 <input type="button" value="+" onClick={this.props.Add}/>
             </div>
         )
     }
 }

 class Container extends React.Component{

     constructor(){
         super();
         this.Update = this.Update.bind(this);
     }

     Update(){
         store.dispatch({type:"ADD"})
     }

     render(){
         return <Counter num={store.getState()} Add={this.Update}></Counter>
     }
 }


 const domRender = ()=>{
     ReactDOM.render(<Container></Container>,document.querySelector("#app"));
 }

 store.subscribe(domRender);

 domRender();