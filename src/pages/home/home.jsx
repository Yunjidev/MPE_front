import { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const usersData = async () =>{
          const response = await getData("users");
          setUsers(response)
      }
      usersData();
    }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>Bienvenue sur la page d&apos;acceuil</p>
      { users.map(user => (<p key={user.id}>{user.username}</p>))}
    </div>
  );
}
