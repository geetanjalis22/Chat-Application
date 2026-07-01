function Sidebar({ users }) {
  return (
    <div className="sidebar">
      <h2>Online Users ({users.length})</h2>

      {users.length === 0 ? (
        <p>No users online</p>
      ) : (
        users.map((user) => <div key={user}>● {user}</div>)
      )}
    </div>
  );
}

export default Sidebar;
