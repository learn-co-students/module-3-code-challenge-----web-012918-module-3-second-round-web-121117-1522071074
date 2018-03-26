document.addEventListener('DOMContentLoaded', function(event){
// console.log('loaded')



const BASE_URL = 'http://localhost:3000/beers'



//---------

// fetch for data
fetch(BASE_URL)
	.then(res => res.json())
	.then((json) => {console.log(json)

		renderBeerList(json)
	})


// patch to update the description
function updateBeer(val, beerid) {
    fetch(`${BASE_URL}/${beerid}`, {
      method: 'PATCH',
      headers: {
				'Content-Type': 'application/json',
    		'Accept': 'application/json'
      },
      body: JSON.stringify({
        description: val
      })
    })
    .then((res) => { return res.json() })
    .then(json => { console.log('Updated JSON:' + json)})
  }


//temp pulling of data: work around
 // renderBeerList(getBeer())


// ------
 // beer list to show

function renderBeerList(json){
	for (let i = 0; i < json.length; i++){

		let beerName = document.createElement('li')
		beerName.innerText = json[i].name;
		beerName.dataset.id = json[i].id
		console.log(json[i])

		// let beerID =

		let beerIMG = document.createElement('img')
		beerIMG.src = json[i].image_url

		let beerTag = document.createElement('h3')
		beerTag.innerText = json[i].tagline


		beerList = document.getElementById('list-group')
		beerList.append(beerName)

		beerName.addEventListener('click', function(event){
			beerDetails = document.getElementById('beer-detail')
			console.log(beerDetails)
			beerDetails.innerHTML = ""


			let singleBeerName = document.createElement('h1')
			singleBeerName.innerText = event.target.innerText
			singleBeerName.dataset.id = event.target.dataset.id


			// console.log(beerDetails)

			let beerImg = document.createElement('img')
			// beerImg.src = json['image_url']
			beerDetails = document.getElementById('beer-detail')
			beerDetails.append(singleBeerName)

			beerDetails.append(beerIMG)
			beerDetails.append(beerTag)


			let beerForm = document.createElement('form');
			beerForm.addEventListener('submit', (event) => {
				event.preventDefault()
				beerDescription = document.getElementById('beer-description')
				const submitVal = beerDescription.value
				// console.log(event)
				const beerId = parseInt(singleBeerName.dataset.id)
				updateBeer(submitVal, beerId)
			})


// get vaule from submit
// send that PATCH



			beerForm.innerHTML =`
				<input type="text" id= "beer-description" value='${json[i].description}'>
				<br>
				<input type="submit" id="edit-beer">`
			beerDetails.append(beerForm)

		})
 }}//render beerlist end


// function renderBeer(event){
// 	let singleBeerName = document.createElement('h1')
// 	singleBeerName.innerText = event.target.innerText
//
// 	console.log(event)
//
// 	let beerImg = document.createElement('img')
// 	beerImg.src = 'image_url'
// 	beerDetails = document.getElementById('beer-detail')
// 	beerDetails.append(singleBeerName)
//
// }


//
// <h1>Beer Name</h1>
// <img src="<add beer img url here>">
// <h3>Beer Tagline</h3>
// <textarea>Beer Description</textarea>
// <button id="edit-beer" class="btn btn-info">
//   Save
// </button>

// button.addEventListener('click', function(event){
// 	let username = document.getElementById('beer-description').value
//
// })


})
