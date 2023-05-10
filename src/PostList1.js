import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

export default function PostList1({onClick}) {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: (queryKey) => getPosts()
    });
    
    if (postQuery.isLoading)
        return <div>Loading...</div>;
    if (postQuery.isError)
        return <div>{JSON.stringify(postQuery.error)}</div>;

    const handleOnClick = (id) => {
        onClick(id);
    }
    return (
        <div>
        {postQuery.data.map(post => (
            <div key={post.id} onClick={() => handleOnClick(post.id)}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            </div>
        ))}
        </div>
    );
}