const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const internshipGrid = document.getElementById('internshipGrid');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const internshipSearch = document.getElementById('internshipSearch');
const caseSearch = document.getElementById('caseSearch');

function toggleTheme() {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

function filterInternships(filter) {
  const cards = internshipGrid.querySelectorAll('.internship-card');
  cards.forEach(card => {
    const category = card.dataset.category;
    card.style.display = filter === 'All' || category === filter ? 'grid' : 'none';
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterInternships(button.dataset.filter);
  });
});

function searchCards(input, selector) {
  const query = input.value.toLowerCase().trim();
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
}

internshipSearch.addEventListener('input', () => {
  searchCards(internshipSearch, '.internship-card');
});

caseSearch.addEventListener('input', () => {
  searchCards(caseSearch, '.case-card');
});

// Preserve theme preference
const savedTheme = localStorage.getItem('lexbriefly-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
  const enabled = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('lexbriefly-theme', enabled);
});

// Prevent form submission for demo
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => event.preventDefault());
}
