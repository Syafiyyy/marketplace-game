// Selecting the main display area for video and image
const mainDisplay = document.getElementById('mainDisplay');
const carouselVideo = document.getElementById('carouselVideo');
const carouselImage = document.getElementById('carouselImage');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;

// Function to display selected media (image or video)
function displayMedia(type, src) {
    if (type === 'video') {
        carouselImage.style.display = 'none';
        carouselVideo.style.display = 'block';
        carouselVideo.src = src;
        carouselVideo.autoplay = true; // Autoplay the video
        carouselVideo.muted = true; // Mute the video to allow autoplay
        carouselVideo.play(); // Play the video automatically
    } else if (type === 'image') {
        carouselVideo.style.display = 'none';
        carouselImage.style.display = 'block';
        carouselImage.src = src;
        carouselVideo.pause(); // Pause the video when switching to an image
    }
}

// Add click event listener to each thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        const mediaType = thumbnail.getAttribute('data-type');
        const mediaSrc = thumbnail.getAttribute('data-src');
        displayMedia(mediaType, mediaSrc);
        currentIndex = index; // Update current index for navigation
    });
});

// Automatically display the first video when the page loads
window.addEventListener('load', () => {
    const firstThumbnail = thumbnails[0]; // Get the first thumbnail
    const mediaType = firstThumbnail.getAttribute('data-type'); // Get the media type (video/image)
    const mediaSrc = firstThumbnail.getAttribute('data-src'); // Get the source (video/image path)
    displayMedia(mediaType, mediaSrc); // Automatically load and play the first video or image
});

// Carousel navigation buttons
document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1; // Move to the previous thumbnail
    const mediaType = thumbnails[currentIndex].getAttribute('data-type');
    const mediaSrc = thumbnails[currentIndex].getAttribute('data-src');
    displayMedia(mediaType, mediaSrc);
});

document.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0; // Move to the next thumbnail
    const mediaType = thumbnails[currentIndex].getAttribute('data-type');
    const mediaSrc = thumbnails[currentIndex].getAttribute('data-src');
    displayMedia(mediaType, mediaSrc);
});
