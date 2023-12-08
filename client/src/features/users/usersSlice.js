import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import axios from "axios";

// const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const usersAdapter = createEntityAdapter();

// const initialState = []
const initialState = usersAdapter.getInitialState()

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const response = await axios.get(USERS_URL);
//     return [...response.data]
//   } catch (err) {
//     return err.message;
//   }
// })

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers:{},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       return action.payload;
//     })
//   }
// })

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getUsers: builder.query({
          query: () => '/users',
          transformResponse: responseData => {
              return usersAdapter.setAll(initialState, responseData)
          },
          providesTags: (result, error, arg) => [
              { type: 'User', id: "LIST" },
              ...result.ids.map(id => ({ type: 'User', id }))
          ]
      })
  })
})

export const {
  useGetUsersQuery
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

// export default usersSlice.reducer