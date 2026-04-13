export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  return (
    <div className="glass-card" style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      padding: "1rem",
      alignItems: "center"
    }}>
      <div className="form-group" style={{ marginBottom: 0, flex: 1, minWidth: "200px" }}>
        <input
          id="filter-search"
          className="input-field"
          style={{ padding: "0.5rem 1rem" }}
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0, minWidth: "150px" }}>
        <select
          id="filter-status"
          className="input-field"
          style={{ padding: "0.5rem 1rem", paddingRight: "2.5rem" }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: 0, minWidth: "150px" }}>
        <select
          id="filter-priority"
          className="input-field"
          style={{ padding: "0.5rem 1rem", paddingRight: "2.5rem" }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
}