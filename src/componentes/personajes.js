import Personaje from "./personaje";
import MD5 from "crypto-js/md5"
import { useEffect, useState } from "react";

function Personajes() {
    const [personajes, setPersonajes] = useState([]);
    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("personajes") === null) {
                setPersonajes("Loading...")
            } else {
                setPersonajes(JSON.parse(localStorage.getItem("personajes")))
            }

        } else {

            const ts = "";
            const privatekey = "8048bc4becf64e01c13879d869e590a1dad017f0";
            const publickey = "b10ea41eade42acc0fb7aaffa9476696";

            const hash = MD5(`${ts}${privatekey}${publickey}`).toString()
            console.log(hash)
            const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
            fetch(url,{mode:"no-cors"}).then(res => res.json()).then(res => {
                setPersonajes(res.data.results)
                localStorage.setItem('personajes', res.data.results.toString())

            }).catch(error => console.log(error))
        }
    }, [personajes]);

    if (personajes == "Loading...") {
        return <h2>Loading..</h2>
    }
    else if (Array.isArray(personajes)) {
        return (<table><thead><tr><th>id</th><th>nombre</th><th>descripcion</th></tr></thead><tbody>{personajes.map(personaje => <Personaje key={personaje.id} id={personaje.id} name={personaje.name} description={personaje.description}/>)}</tbody></table>)
    }
    else {
        return <h2>Loading..</h2>
    }
}
export default Personajes