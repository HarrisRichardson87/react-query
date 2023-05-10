
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

export default function PostList2() {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: (queryKey) => getPosts()
    });
    
    if (postQuery.isLoading)
        return <div>Loading...</div>;
    if (postQuery.isError)
        return <div>{JSON.stringify(postQuery.error)}</div>;
    
    return (
        <div>
        {postQuery.data.map(post => (
            <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            </div>
        ))}
        </div>
    );
}