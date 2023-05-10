import { get } from "react-hook-form";

const POSTS = [
    { userId: 1, id: 0, title: 'First Post',       body: 'This is my first post'      },
    { userId: 2, id: 1, title: 'Second Post',      body: 'This is my second post'     },
    { userId: 3, id: 2, title: 'Third Post',       body: 'This is my third post'      },
    { userId: 1, id: 3, title: 'Fourth Post',      body: 'This is my fourth post'     },
    { userId: 2, id: 4, title: 'Fifth Post',       body: 'This is my fifth post'      },
    { userId: 3, id: 5, title: 'Sixth Post',       body: 'This is my sixth post'      },
    { userId: 1, id: 6, title: 'Seventh Post',     body: 'This is my seventh post'    },
    { userId: 2, id: 7, title: 'Eighth Post',      body: 'This is my eighth post'     },
    { userId: 3, id: 8, title: 'Ninth Post',       body: 'This is my ninth post'      },
    { userId: 1, id: 9, title: 'Tenth Post',       body: 'This is my tenth post'      },
    { userId: 2, id: 10, title: 'Eleventh Post',   body: 'This is my eleventh post'   },
    { userId: 3, id: 11, title: 'Twelfth Post',    body: 'This is my twelfth post'    },
    { userId: 1, id: 12, title: 'Thirteenth Post', body: 'This is my thirteenth post' },
    { userId: 2, id: 13, title: 'Fourteenth Post', body: 'This is my fourteenth post' },
    { userId: 3, id: 14, title: 'Fifteenth Post',  body: 'This is my fifteenth post'  },
    { userId: 1, id: 15, title: 'Sixteenth Post',  body: 'This is my sixteenth post'  },
];

export async function getPosts() {
  return wait().then(() => [...POSTS]);
};

export async function getPost(id) {
    return wait().then(() => POSTS.find(post => post.id === id));
}

export async function getPostsByUserId(userId) {
    return wait().then(() => POSTS.filter(post => post.userId === userId));
}

export async function createPost(post) {
    return wait().then(() => {
        const newPost = { ...post, id: POSTS.length, userId: 1 };
        POSTS.push(newPost);
        return newPost;
    });
}

export function getPostsPaginated(page) {
    return getPostsPaginatedData(page, 2)
      .then(data => {
        const hasNext = page * 2 <= parseInt(POSTS.length)
        return {
          nextPage: hasNext ? page + 1 : undefined,
          previousPage: page > 1 ? page - 1 : undefined,
          posts: data,
        }
      })
  }

async function getPostsPaginatedData(page, limit) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return wait().then(() => POSTS.slice(start, end));
}

function wait() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

