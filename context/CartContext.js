import React,{createContext,useReducer} from 'react'

//create context
export const Store = createContext();

//initial state
const initialState = {
    cart : {cartItems:[]}
}

//reducer
const reducer = (state,action) => {
 switch(action.type){
    case 'ADD_ITEM': {
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

        const cartItems = existItem? 
        state.cart.cartItems.map((item)=> item.name === existItem.name? newItem : item)
        : [...state.cart.cartItems, newItem]

        return{
            ...state,
            cart: {...state.cart,cartItems}
        }
    }
    default: 
      return state;
 }
}

//global provider
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
  
    //action
   
return(
    <Store.Provider 
    value = {{
        cart: state.cart,
        dispatch
    }}>
        {children}
    </Store.Provider>
)
}