function unavailableUsers(users, rehearsal) {
  let usersHaveConflicts = users.filter(
    (user) => user.conflicts && user.conflicts.length > 0
  );
  let unavailableUsers = usersHaveConflicts.map((user) => {
    let conflicts_with_this_rehearsal = 0;
    user.conflicts.map((conflict) => {
      if (
        conflict.start_time <= rehearsal.end_time &&
        rehearsal.start_time <= conflict.end_time
      ) {
        conflicts_with_this_rehearsal += 1;
      }
    });
    if (conflicts_with_this_rehearsal > 0) {
      return user;
    }
  });
  return unavailableUsers.filter(Boolean);
}

export { unavailableUsers };
