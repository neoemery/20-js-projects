const imageContainer = document.getElementById('img-container')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API
const count = 30
const apiKey = 'McXNiWAbG3iPY5YDFFi6bMKuLzfc5rEfpc8cmubwIxg'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Check is all images were loaded
function imageLoaded () {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    } 
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length

    // Run Function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event listening, check when each is finished laoding
        img.addEventListener('load', imageLoaded)
        
        // Put <img> inside <a>, then put both inside img-container
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

// on load
getPhotos()