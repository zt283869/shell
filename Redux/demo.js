
// step1: 规则转换
// pure function 把一个值从开始状态转换成
// 一个新值
const Reducer = (state={ c:2,hisval:0 },action)=>{
    const o=state.c;
    switch (action.type){
        case "ADD":
            console.log(state);
            return {c:o+1};
            break;
        default:
            return  state;
    }
}

//step2: 通过redux创建一个针对reducer的仓库
const store = Redux.createStore(Reducer);

//step3:
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
        const {num,onAdd} = this.props;
        return (
            <div>
                <h1>{num}</h1>
                <input type="button" value="+" onClick={onAdd}/>
            </div>
        )
    }
}

//connect的参数方法,把state的值map到props上
const mapStateToProps = (state)=>{
   return {
       num:state.c
   }
}

//把方法绑定dispatch:注意后面应是一个方法
const mapDispatchToProps =(dispatch)=>{
    return {
        //onIncreaseClick: () => dispatch(increaseAction),
        onAdd:()=>dispatch({type:"ADD"})
    }
}

//通过ReactRedux.connect创建Counter组件的容器组件
const CounterContainer =ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Counter)

//class CounterContainer extends React.Component{
//    constructor(){
//        super();
//    }
//
//    render(){
//        return <Counter num={store.getState()} Add={()=>{store.dispatch({type:"ADD"})}}></Counter>
//    }
//}

const main= ()=>{
    ReactDOM.render(
            <ReactRedux.Provider store={store}>
              <CounterContainer/>
            </ReactRedux.Provider>,
        document.querySelector("#app"))
}

//store.subscribe(()=>{
//    main();
//});

main();











