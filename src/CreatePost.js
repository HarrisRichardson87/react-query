import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./api/posts";
import Post from './Post';
const style = {
    border: '1px solid black',
    margin: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
};

const inputStyle = {
    margin: '10px'
};

export default function CreatePost({ setCurrentPage }) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const createPostMutation = useMutation({
        
        mutationFn: createPost,
        onSuccess: (data) => {
            queryClient.setQueryData(['posts', data.id], data);
            queryClient.invalidateQueries(['posts'], { exact: true } );
            setCurrentPage(<Post id={data.id} />);
            reset();
        }
    });

    const onSubmit = data => createPostMutation.mutate(data);

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={style}>
                
                <input 
                    placeholder='title' 
                    style={inputStyle} 
                    {...register("title")} 
                />

                <input 
                    placeholder='body' 
                    style={inputStyle} 
                    {...register("body", { required: true })} 
                />

                {errors.exampleRequired && <span>This field is required</span>}
                
                <input 
                    disabled={createPostMutation.isLoading}
                    placeholder='create post' 
                    style={inputStyle} 
                    type="submit" 
                />
            </form>
        </div>
    );
}