const categoryButtons = document.getElementById('buttons');
fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then(res => res.json())
  .then(data => {
    allButtons(data.categories)
  })


const allButtons = (buttons) => {
  buttons.forEach(button => {
    const { category_icon, id, category } = button
    const div = document.createElement('div')
    div.innerHTML = `
    <button id="btn-${category}" onclick="handleCategory('${category}')" class="btn btn-outline btn-category  border-[#0E7A8133] text-black font-bold"><img class="w-8" src=${category_icon} alt=""> ${category}</button>
    `;

    categoryButtons.appendChild(div)



  })
}

const spinner = document.getElementById('spinner')
const handleCategory = async (category) => {


  spinner.classList.remove('hidden')

  setTimeout(() => {
    loadedCategory(category)
  }, 3000);


}

const loadedCategory = async (category) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  const data = await response.json()

  removeActiveButton()

  const activeBtn = document.getElementById(`btn-${category}`)
  console.log(activeBtn)
  activeBtn.classList.add('btn-accent')
  activeBtn.classList.remove('btn-outline')
  handlePets(data.data)
  spinner.classList.add('hidden')
  console.log(id)




}

const removeActiveButton = () => {
 const btns = document.getElementsByClassName('btn-category')
 for(const btn of btns){
  btn.classList.remove('btn-accent')
  btn.classList.add('btn-outline')
 }
}

const handleAllPets = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
  const data = await response.json()
  // console.log(data.pets)
  handlePets(data.pets)
  // console.log(data.pets)
}

handleAllPets()






const handlePets = (pets) => {
  const cardData = document.getElementById('data');
  cardData.innerHTML = ''


  const nodata = document.createElement('div')
  nodata.innerHTML = `
      <img class="w-full md:ml-80"  src="./assets/images/error.webp" alt="">
      `

  if (pets.length === 0) {

    cardData.appendChild(nodata)

  }
  //  console.log(pets)

  pets.forEach(pet => {
    const { breed, category, date_of_birth, gender, image, petId, pet_details, pet_name, price } = pet;
    // console.log(pet)
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="card bg-base-100  shadow-xl">
  <figure>
    <img
      src=${image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-bold text-2xl">${pet_name} </h2>
    <p><i class="fa-solid fa-table-cells"></i>Breed : ${breed || 'No data available'}</p>
    <p><i class="fa-regular fa-calendar"></i></i>Birth : ${date_of_birth || 'No data available'}</p>
    <p><i class="fa-solid fa-mercury"></i>Gender : ${gender || 'No data available'}</p>
    <p><i class="fa-solid fa-dollar-sign"></i>Price : ${price || 'No data available'}</p>
    <div class="flex justify-around">
      <button onclick="handleLike('${image}')" class="btn btn-outline btn-info btn-sm"><i class="fa-regular fa-thumbs-up"></i></button>
      <button id="${petId}" onclick="handleAdopt('${petId}')"  class="btn btn-outline btn-info btn-sm">Adopt</button>
      <button onclick="handleDetailBtn('${petId}')" class="btn btn-outline btn-info btn-sm">Details</button>
    </div>
  </div>
</div>
      `;





    cardData.appendChild(div)

  })

}


const handleAdopt = (petId) => {
  const adoptButton = document.getElementById(petId);
  adoptButton.textContent = 'adopted'
  adoptButton.disabled = true;

  const modalContent = document.getElementById('modal-content')
  modalContent.innerHTML = `
  <i class="fa-regular fa-handshake md:text-6xl"></i>
   <h1 class="md:text-3xl font-bold text-center">Congratulation</h1>
   <p>adoption process is start for your pet</p>
   <p class="md:text-4xl font-bold" id="count-value">3</p>
  `

  my_modal_4.showModal()
  setTimeout(() => {
    my_modal_4.close()
  }, 3200);

  const countValue = document.getElementById('count-value');
  const countValueNum = parseInt(countValue.innerText)
  startCountdown(countValueNum)
}


function startCountdown(seconds) {
  let counter = seconds;

  const interval = setInterval(() => {

    counter--;
    let countValue = document.getElementById('count-value');
    countValue.innerHTML = counter
    if (counter < 2) {
      clearInterval(interval);

    }
  }, 1000);
}






const handleDetailBtn = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res => res.json())
    .then(data => {
      handleDetailData(data.petData)
      console.log(data.petData)
    })

  const handleDetailData = (data) => {
    const { breed, petId, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = data;

    const modalId = document.getElementById('modal-element')

    modalId.innerHTML = `
    <div class="card bg-base-100  shadow-xl">
  <figure>
    <img
      src=${image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-bold text-3xl">${pet_name}</h2>
   <div class="grid grid-cols-2 gap-5">
   <p><i class="fa-solid fa-table-cells"></i>Breed : ${breed || 'No data available'}</p>
    <p><i class="fa-regular fa-calendar"></i></i>Birth : ${date_of_birth || 'No data available'}</p>
    <p><i class="fa-solid fa-mercury"></i>Gender : ${gender || 'No data available'}</p>
    <p><i class="fa-solid fa-dollar-sign"></i>Price : ${price || 'No data available'}</p>
    <p><i class="fa-solid fa-dollar-sign"></i>Vaccine : ${vaccinated_status || 'No data available'}</p>
    
   </div>
   <h1 class="fond-bold text-xl">Detail Information</h1>
   <p> ${pet_details || 'No data available'}</p>
    
  </div>
</div>
    `
    modalId.appendChild(div);
  }

  document.getElementById('my_modal_1').showModal()


}


const handleLike = (image) => {

  const petImage = document.getElementById('petImage')

  const img = document.createElement('div')
  img.innerHTML = `
   <img src=${image} alt="">
  `


  petImage.appendChild(img)

}



const sortAllPet = (data) => {
  return data.sort((a, b) => b.price - a.price);
}

document.getElementById('sort-button').addEventListener('click', async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await res.json();
  const sortedPet = sortAllPet(data.pets)
  handlePets(sortedPet)
})


