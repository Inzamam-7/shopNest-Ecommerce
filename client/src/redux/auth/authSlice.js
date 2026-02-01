import {createSlice} from '@reduxjs/toolkit'
import {loginUser, registerUser, getUser} from './authThunks'

const initialState = {
    user: null,
    isAuthenticated:false,
    status:'idle',
    error:null,
    authChecked:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){
            state.user = null;
            state.status = 'idle';
            state.error = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(loginUser.fulfilled, (state,action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.status = 'succeeded';
            state.authChecked = true;
        })
        .addCase(registerUser.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.status = 'succeeded';
            state.authChecked = true;
        })
        .addCase(getUser.fulfilled, (state, action) =>{
            state.user = action.payload;
            console.log(state.user);
            
            state.isAuthenticated = true;
            state.status = "succeeded";
            state.authChecked = true;
        })
        .addCase(getUser.rejected, (state, action)  => {
            state.user = null;
            state.isAuthenticated = false;
            state.authChecked = true;
            state.status = 'failed';
        })

        .addMatcher(
            (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
            (state,_) =>{
                state.status = 'loading';
                state.error = null;
            }
        )

        .addMatcher(
            (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
            (state,action) =>{
                state.status = 'failed';
                state.error = action.payload;
                state.authChecked = true;
            }
        )
    }
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;

