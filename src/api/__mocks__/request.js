const authors = {
  1: {
      first_name: 'Pam',
      last_name: 'Mandigo'
    },
  2: {
      first_name: 'John',
      last_name: 'Webster'
    }
}

export default function request(url) {
  return new Promise((resolve, reject) => {
    const authorId = parseInt(url.substr('/authors/'.length), 10);
    process.nextTick(
      () =>
        authors[authorId]
          ? resolve(authors[authorId])
          : reject({
            error: 'user with ' + authorId + ' not found',
          })
    )
  })
}
