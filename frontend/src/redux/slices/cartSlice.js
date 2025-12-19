import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { use } from "react";
import { VITE_BACKEND_URL } from "../../api/api";

// helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    const stroedCart = localStorage.getItem("cart");
    return stroedCart ? JSON.parse(stroedCart) : { products: [] };
};
// helper function ot save cart 
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


// fetch cart for user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${VITE_BACKEND_URL}/api/cart`,
            {
                params: { userId, guestId }
            },
        );
        return response.data;
    } catch (err) {
        console.error(err);
        return rejectWithValue(err.response.data);

    }
});


// add item to cart for user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, userId, guestId
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// update quantity of an item in cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${VITE_BACKEND_URL}/api/cart`, {
                productId, quantity, size, color, userId, guestId
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// remove item from cart 
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${VITE_BACKEND_URL}/api/cart`,
            data: { productId, size, color, userId, guestId },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
}
);


// merge guest cart and user cart 
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${VITE_BACKEND_URL}/api/cart/merge`,
            { guestId, user },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            },
        );
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            // add to cart 
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })
            // update quantity 
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })
            // remove from cart 
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item";
            })
            // merge cart 
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            });
    }
});


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;