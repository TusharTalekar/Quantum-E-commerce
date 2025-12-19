import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../api/api";

// fetch all users 
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async () => {
        const response = await axios.get(
            `${VITE_BACKEND_URL}/api/admin/users`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    }
);


// add create user Action
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// updat user info 
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ id, name, email, role }) => {
        const response = await axios.put(
            `${VITE_BACKEND_URL}/api/admin/users/${id}`,
            { name, email, role },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data.user;
    }
);


// delete user 
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id) => {
        await axios.delete(
            `${VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return id;
    }
);


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch user 
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                // state.error=null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // update user
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex(
                    (user) => user._id === updatedUser._id
                );
                if (userIndex !== -1) state.users[userIndex] = updatedUser;
            })
            // delete user 
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            // add user 
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});


export default adminSlice.reducer;