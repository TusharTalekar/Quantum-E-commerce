import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../api/api";

// fetch user orders 
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${VITE_BACKEND_URL}/api/orders/my-orders`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    } catch (err) {
        rejectWithValue(err.response.data);
    }
});


// fetch order details by id 
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${VITE_BACKEND_URL}/api/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    } catch (err) {
        rejectWithValue(err.response.data);
    }
});


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch orders 
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // fetch order details 
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    }
});


export default orderSlice.reducer;