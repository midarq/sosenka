import { useState } from "react";

const USERS = [
  {
    name: "Sierściuch",
    role: "admin",
    image: "/sosenka/users/siersciuch.jpeg",
    passwords: ["Sierściuch"],
  },
  {
    name: "Patryk",
    role: "admin",
    image: "/sosenka/users/patryk.jpeg",
    passwords: ["patryk", "Patryk"],
  },
  {
    name: "Kuba",
    role: "admin",
    image: "/sosenka/users/kuba.jpeg",
    passwords: ["kuba", "Kuba"],
  },
  {
    name: "Czajson",
    role: "admin",
    image: "/sosenka/users/czajson.jpeg",
    passwords: ["czajson", "Czajson"],
  },
  {
    name: "Fizyk",
    role: "admin",
    image: "/sosenka/users/fizyk.jpeg",
    passwords: ["fizyk", "Fizyk"],
  },
];

const sections = [
  "Lista rzeczy",
  "Wydatki",
  "Notatki",
  "Plany",
  "Log roku",
];

function App() {
  const savedUser = localStorage.getItem("sosenka-user");

  const [currentUser, setCurrentUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("Lista rzeczy");

  function normalize(text) {
    return text.trim().toLowerCase();
  }

  function findUserByPassword(passwordValue) {
    const normalizedPassword = normalize(passwordValue);

    return USERS.find((user) =>
      user.passwords.some((passwordOption) => {
        return normalize(passwordOption) === normalizedPassword;
      })
    );
  }

  function handleLogin(event) {
    event.preventDefault();

    const user = findUserByPassword(password);

    if (user) {
      const userProfile = {
        name: user.name,
        role: user.role,
        image: user.image,
      };

      localStorage.setItem("sosenka-user", JSON.stringify(userProfile));
      setCurrentUser(userProfile);
      setPassword("");
    } else {
      alert("Nie znam takiego hasła");
    }
  }

  function handleLogout() {
    localStorage.removeItem("sosenka-user");
    setCurrentUser(null);
    setPassword("");
  }

  if (!currentUser) {
    return (
      <main
        className="min-h-screen bg-contain bg-center bg-no-repeat bg-black text-stone-900 flex items-end justify-center p-6 pb-12"
        style={{ backgroundImage: "url('/sosenka/background.jpeg')" }}
      >
        <section className="w-full max-w-md rounded-3xl bg-white/55 p-8 shadow-2xl backdrop-blur-md border border-white/30">
          <h1 className="text-4xl font-bold text-emerald-800">Sosenka</h1>
          <p className="mt-3 text-stone-700">
            Organizator wyjazdów dla naszej ekipy.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-3">
            <input
              type="password"
              placeholder="Wpisz hasło"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3"
            />
            <button className="w-full rounded-xl bg-emerald-800 px-4 py-3 font-semibold text-white">
              Wejdź
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-emerald-800">Sosenka</h1>
            <p className="mt-2 text-stone-600">
              Zalogowany: <strong>{currentUser.name}</strong>
              {currentUser.role === "admin" && " — admin"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={currentUser.image}
              alt={`Profil użytkownika ${currentUser.name}`}
              className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-lg"
            />

            <button
              onClick={handleLogout}
              className="rounded-xl bg-stone-700 px-4 py-2 font-semibold text-white"
            >
              Wyloguj
            </button>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`rounded-full px-4 py-2 font-medium ${
                activeSection === section
                  ? "bg-emerald-800 text-white"
                  : "bg-white text-stone-700"
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        <section className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">{activeSection}</h2>
          <p className="mt-3 text-stone-600">
            To jest miejsce na moduł: {activeSection}.
          </p>

          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-stone-100 p-4">
            <img
              src={currentUser.image}
              alt={`Profil użytkownika ${currentUser.name}`}
              className="h-16 w-16 rounded-full object-cover shadow"
            />

            <div>
              <p>
                Profil użytkownika: <strong>{currentUser.name}</strong>
              </p>
              <p>
                Rola: <strong>{currentUser.role}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;