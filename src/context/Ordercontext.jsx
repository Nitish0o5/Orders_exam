import { createContext, useContext, useReducer, useEffect } from "react";
import OrderReducer from "../reducer/Orderreducer.jsx";
import { getToken, getDataset } from "../services/api.js";

const initialState = {
  orders: [],
  loading: true,
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const tokenRes = await getToken(
          "E0323010", 
          "412957",   
          "setA",   
        );

        
        const orders = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log("Fetched orders:", orders);
        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
