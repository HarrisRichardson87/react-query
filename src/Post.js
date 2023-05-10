import { useQuery } from "@tanstack/react-query";
import { getPost }  from "./api/posts";
import { getUser }  from "./api/users";

// user inline style to make it easier to see the difference between the two lists
const style = {
    border: '1px solid black',
    margin: '10px',
    padding: '10px'
};

export default function Post({id}){
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: (queryKey) => getPost(id)
    });

    const userQuery = useQuery({
        queryKey: ['users', id],
        enabled: postQuery?.data?.userId !== undefined,
        queryFn: (queryKey) => getUser(postQuery?.data?.userId)
    });

    if (postQuery.isLoading)
        return <div>Loading...</div>;

    if (postQuery.isError)
        return <div>{JSON.stringify(postQuery.error)}</div>;

    if (userQuery.isLoading)
        return <div>Loading...</div>;

    if (userQuery.isError)
        return <div>{JSON.stringify(userQuery.error)}</div>;

    return (
        <div style={style}>
            <h1>{postQuery.data.title}</h1>
            <p>{postQuery.data.body}</p>
            <h2>{userQuery?.data?.name}</h2>
        </div>
    );
        
}