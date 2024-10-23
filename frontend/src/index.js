const VITE_MAP_API_KEY="AIzaSyCa-3eZA4d89v6NFi8C7j3Vx7VFZbu0bcE"


let address = "1600 Amphitheatre Parkway, Mountain View, CA";
const replacedAddress = address.replaceAll(" ","+");
console.log(replacedAddress)


const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${VITE_MAP_API_KEY}`)
.then((response) => response.json())
.then((data)=> console.log(`data -> ${JSON.stringify(data.results[0].geometry.location)}`))
.catch(({name, message}) => console.log({type:name, message:message}));

