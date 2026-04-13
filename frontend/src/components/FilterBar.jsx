export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  dateFilter,
  setDateFilter,
}) {
  return (
    <div className="glass-card" style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      padding: "1rem",
      alignItems: "center"
    }}>
      <div className="form-group" style={{ marginBottom: 0, flex: 2, minWidth: "150px" }}>
        <input
          id="filter-search"
          className="input-field"
          style={{ padding: "0.5rem 1rem" }}
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0, minWidth: "120px" }}>
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
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: 0, minWidth: "120px" }}>
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

      <div className="form-group" style={{ marginBottom: 0, minWidth: "120px" }}>
        <select
          id="filter-date"
          className="input-field"
          style={{ padding: "0.5rem 1rem", paddingRight: "2.5rem" }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
        </select>
      </div>
    </div>
  );
}