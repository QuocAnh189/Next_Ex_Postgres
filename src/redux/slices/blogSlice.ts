import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitBlog } from 'src/styles/blog';

type InitialType = {
    blog: IBlog;
    blogs: IBlog[];
};

const initialState = {
    blog: InitBlog,
    blogs: []
} as InitialType;

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        fetchBlog: (state, action: PayloadAction<IBlog>) => {
            state.blog = action.payload;
        },

        fetchBlogs: (state, action: PayloadAction<IBlog[]>) => {
            state.blogs = action.payload;
        },

        addBlog: (state, action: PayloadAction<IBlog>) => {
            state.blogs.push(action.payload);
        },

        updateBlog: (state, action: PayloadAction<IBlog>) => {
            state.blogs = state.blogs.map((blog) => (blog?._id === action.payload?._id ? action.payload : blog));
        },

        deleteBlog: (state, action: PayloadAction<IBlog>) => {
            state.blogs = state.blogs.filter((blogs) => blogs?._id !== action.payload?._id);
        }
    }
});

export const { fetchBlog, fetchBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
