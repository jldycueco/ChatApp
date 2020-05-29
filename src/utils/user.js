const users = [];

const addUser = (id, username, room) => {
  const existingUser = users.find((user) => user.room === room && user.username === username);

  if(!username || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { username, id, room }
  users.push(user);

  return { user };
}

const getCurrentUser = (id) => {
  return users.find(user => user.id === id);
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1){
    return users.splice(index, 1)[0];
  }

  // const userLeft = users.filter(user => user.id === id)

  // if (userLeft.length > 0) {
  //   return userLeft[0];
  // }

}

const getRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}

export { addUser, getCurrentUser, removeUser, getRoomUsers }

