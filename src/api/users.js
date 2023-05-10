const USERS = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Fake Name' },
    { id: 3, name: 'Bob Smith' },
];

export async function getUsers() {
    return wait().then(() => [...USERS]);
}

export async function getUser (id) {
    return wait().then(() => USERS.find(user => user.id === id));
}

function wait() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}