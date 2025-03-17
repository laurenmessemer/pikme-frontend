import { useEffect, useState } from "react";

const ListAllContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Simulated API call for contest data (Replace with real API call)
    setTimeout(() => {
      setContests([
        { id: 1, name: "Best Sunset Photo", status: "Live", entries: 345, votes: 12034, createdBy: "Admin" },
        { id: 2, name: "Street Style Fashion", status: "Upcoming", entries: 142, votes: 0, createdBy: "Admin" },
        { id: 3, name: "Coziest Home Setup", status: "Past", entries: 589, votes: 21567, createdBy: "User123" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="list-contests-container">
      <h2>All Contests</h2>

      {!contests.length ? (
        <p>Loading contests...</p>
      ) : (
        <table className="contests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Entries</th>
              <th>Votes</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id} className={contest.status.toLowerCase()}>
                <td>{contest.id}</td>
                <td>{contest.name}</td>
                <td><span className={`status ${contest.status.toLowerCase()}`}>{contest.status}</span></td>
                <td>{contest.entries}</td>
                <td>{contest.votes}</td>
                <td>{contest.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListAllContests;
