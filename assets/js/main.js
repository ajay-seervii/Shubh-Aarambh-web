// Scroll reveal
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Load features from JSON
fetch('assets/raw/features.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('features-container');

        data.features.forEach((feature, index) => {
            const card = document.createElement('div');
            card.className = `card reveal delay-${(index % 3) + 1}`;

            card.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;

            container.appendChild(card);
            observer.observe(card);
        });
    })
    .catch(err => {
        console.error('Failed to load features.json', err);
    });
