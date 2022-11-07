import { FormEvent, useState } from "react";

interface Candidate {
  firstName: string;
  secondName: string;
  profile: string;
}

const profileTypes = ["C", "C++", "C#", "JAVA", "JAVASCRIPT", "PHP"];

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (candidates.find((candidate) => candidate.firstName === firstName)) {
      setErrorMessage("user already exists");
    } else {
      setCandidates((oldState) => [
        ...oldState,
        { firstName, secondName, profile },
      ]);
      setErrorMessage(null);
    }
  };

  const handleDelete = () => {
    selectedCandidate.forEach((selectedCandidate) =>
      setCandidates((oldState) =>
        oldState.filter(
          (candidate) => candidate.firstName !== selectedCandidate
        )
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div style={{}}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(({ firstName, secondName, profile }) => (
              <tr key={firstName}>
                <td>{firstName}</td>
                <td>{secondName}</td>
                <td>{profile}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (
                        selectedCandidate.find((name) => name === firstName)
                      ) {
                        setSelectedCandidate((oldState) =>
                          oldState.filter(
                            (candidate) => candidate !== firstName
                          )
                        );
                      } else {
                        setSelectedCandidate((oldState) => [
                          ...oldState,
                          firstName,
                        ]);
                      }
                    }}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div style={{ width: "20%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              <label>First name</label>
              <input
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
              ></input>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <label>Last name</label>
              <input
                type="text"
                onChange={(event) => setSecondName(event.target.value)}
              ></input>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <label>Profile</label>
              <select
                name="example"
                onChange={(event) => setProfile(event.target.value)}
              >
                {profileTypes.map((profileType) => (
                  <option key={profileType} value={profileType}>
                    {profileType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" style={{ width: "20%" }}>
            Save
          </button>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default App;
