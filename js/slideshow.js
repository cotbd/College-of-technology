let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 10000); // Change image every 2 seconds
}


// Function to animate counting from 0 to a target value
function animateCount(element, target, duration, symbol) {
    let start = 0;
    const increment = target / (duration / 16); // 16ms per frame for smooth animation

    const updateCount = () => {
        start += increment;
        const roundedValue = Math.floor(start);

        // Add '%' and '+' symbols here
        element.innerText = `${roundedValue}${symbol}`;

        if (start < target) {
            requestAnimationFrame(updateCount);
        } else {
            // Set the final value with '%' and '+' symbols
            element.innerText = `${target}${symbol}`;
        }
    };

    updateCount();
}

// Set the target values
const graduatesCountElement = document.getElementById('graduatesCount');
const placementCountElement = document.getElementById('placementCount');
const coursesCountElement = document.getElementById('coursesCount');
const intakeCountElement = document.getElementById('intakeCount');

const graduatesTarget = 85;
const placementTarget = 80;
const coursesTarget = 20;
const intakeTarget = 350;

// Function to check if an element is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the intersection changes
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start counting animation when the element is in the viewport
            animateCount(graduatesCountElement, graduatesTarget, 2000, '%'); // 2000ms duration
            animateCount(placementCountElement, placementTarget, 2000, '%');
            animateCount(coursesCountElement, coursesTarget, 2000, '+');
            animateCount(intakeCountElement, intakeTarget, 2000, '+');

            // Unobserve the target once the animation starts to avoid unnecessary repetitions
            observer.unobserve(entry.target);
        }
    });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

// Observe the target elements
observer.observe(document.querySelector('.aboutus'));

// document.addEventListener('DOMContentLoaded', function () {
//     var video = document.getElementById('mySlides');

//     // Event listener for when the video ends
//     video.addEventListener('ended', function () {
//         // Rewind the video to the beginning
//         video.currentTime = 0;
//     });
// });