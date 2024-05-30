//DESARROLLA AQUI TUS SOLUCIONES
/*Ejercicio 1.- Declara una función **getRandomPokemon** que retorne un pokemon aleatorio.*/

const getRandomPokemon = async () => {

    try {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        if (resp.ok) {
            const data = await resp.json();
            const totalPokemons = data.count;
            const randomId = Math.floor(Math.random() * totalPokemons) + 1;

            const randomResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            if (randomResp.ok) {
                const randomPokemon = await randomResp.json();
                return randomPokemon;
            }
        }
    }
    catch (error) {
        console.log("Error 2")
    }
}

getRandomPokemon()
    .then((pokemon) => { console.log(pokemon) })
    .catch((error) => { console.log(error) })


/*Ejercicio 2.- Declara una funcion **getImageAndName** que retorne el nombre y la URL de la imagen 
de un pokemon => (return {img, name})*/

async function getImageAndName(pokemon) {

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = await response.json();
    let name = data.name;
    let img = data.sprites.front_default;
    return { name, img }

}

/*Ejercicio 3.- Declara una funcion **printImageAndName** que retorne el string 
necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:

```html
<section>
    <img src="url de imagen" alt="nombre del pokemon">
    <h1>Nombre del pokemon</h1>
</section>*/

const printImageAndName = async () => {
    try {
        const pokemon = await getRandomPokemon();
        if (pokemon) {
            const { name, sprites } = pokemon;
            const imageUrl = sprites.front_default;

            // Crear los elementos
            const section = document.createElement('section');
            const img = document.createElement('img');
            const h1 = document.createElement('h1');

            // Configurar los atributos del img
            img.src = imageUrl;
            img.alt = name;

            // Configurar el contenido del h1
            h1.textContent = name;

            // Anidar los elementos
            section.appendChild(img);
            section.appendChild(h1);

            // Devolver el HTML del section como una cadena
            return section.outerHTML;
        } else {
            throw new Error('No Pokémon found');
        }
    } catch (error) {
        console.log('Error:', error);
        return ''; // Devuelve una cadena vacía en caso de error
    }
};

/* Ejercicio 4.- Declara una función **getRandomDogImage** que retorne la url de la imagen de un perro aleatorio*/

const getRandomDogImage = async () => {

    try {
        const resp = await fetch(`https://dog.ceo/api/breeds/image/random`, { method: 'GET' })

        if (resp.ok) {
            const data = await resp.json()
            return data.message
        } else {
            throw console.log("Error")
        }
    } catch (err) {
        console.log("Error al obtener imagen")
    }
}

getRandomDogImage()
    .then((imagen) => { console.log(imagen) })
    .catch((error) => { console.log(error) })


/*Ejercicio 5.- Declara una función **getRandomPokemonImage** que retorne la url de la imagen de un 
pokemon aleatorio.
*/

const getRandomPokemonImage = async () => {
    try {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        if (resp.ok) {
            const data = await resp.json();
            const totalPokemons = data.count;
            const randomId = Math.floor(Math.random() * totalPokemons) + 1;

            const randomResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            if (randomResp.ok) {
                const randomPokemon = await randomResp.json();
                return randomPokemon.sprites.front_default;
            } else {
                throw console.log('Error');
            }
        } else {
            throw console.log('Error 2');
        }
    } catch (error) {
        console.log('Error');
        throw error;
    }
};

getRandomPokemonImage()
    .then((imageUrl) => { console.log(imageUrl); })
    .catch((error) => { console.log(error); });


/*Ejercicio 6.- Declara una función **printPugVsPikachu** que pinte la batalla entre "Pug" y "Pikachu" (no se testea)*/

const printPugVsPikachu = async () => {
    try{
        const img1 = await fetch (`https://pokeapi.co/api/v2/pokemon/pikachu`)
        const img2 = await fetch (`https://dog.ceo/api/breed/pug/images/random`)
        if(img1.ok && img2.ok){
            const data = await img1.json()
            const dato = await img2.json()
            const imagenPikachu = data.sprites.back_shiny_female
            const imagenPug = dato.message
            return imagenPikachu, imagenPug
        }else { throw console.log("Error")}
    } catch (error) {
     console.log(error)
    }
}

printPugVsPikachu()
    .then((imagenPikachu, imagenPug) => {
        const printImgs = document.querySelector("#tarjeta")
        const imagenPika = document.createElement("img")
        const imagenPuga = document.createElement("img")
        
        imagenPika.src = imagenPikachu
        imagenPuga.src = imagenPug

        printImgs.append(imagenPika, imagenPuga)

     } )
/*Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.*/

const getRandomCharacter = async () => {
    try {
        const resp = await fetch('https://rickandmortyapi.com/api/character');
        if (resp.ok) {
            const data = await resp.json();
            const totalCharacters = data.info.count;
            const randomId = Math.floor(Math.random() * totalCharacters) + 1;

            const randomResp = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
            if (randomResp.ok) {
                const randomChar = await randomResp.json();
                return randomChar;
            } else {
                throw console.log('Error');
            }
        } else {
            throw console.log('Error 2');
        }
    } catch (error) {
        console.log('Error');
        throw error;
    }
}

getRandomCharacter()
    .then((character) => { console.log(character); })
    .catch((error) => { console.log(error); });


/*Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne de un personaje su imagen, 
nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, 
tendrás que hacer otro fetch para llegar a los ultimos datos. 
Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})*/


const getRandomCharacterInfo = async () => {
    try {
        const resp = await fetch('https://rickandmortyapi.com/api/character');
        if (resp.ok) {
            const data = await resp.json();
            const totalCharacters = data.info.count;
            const randomId = Math.floor(Math.random() * totalCharacters) + 1;

            const randomResp = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
            if (randomResp.ok) {
                const randomChar = await randomResp.json();
                const { image: img, name, episode: episodes } = randomChar;
                const firstEpisodeResp = await fetch(episodes[0]);
                if (firstEpisodeResp.ok) {
                    const firstEpisodeData = await firstEpisodeResp.json();
                    const { name: firstEpisode, air_date: dateEpisode } = firstEpisodeData;

                    return { img, name, episodes, firstEpisode, dateEpisode };
                } else {
                    throw console.log('Error al obtener el primer episodio');
                }

            } else {
                throw console.log('Error al obtener datos del personaje aleatorio');
            }
        } else {
            throw console.log('Error al obtener el número total de personajes');
        }
    } catch (error) {
        console.log(error.message);
    }
};

