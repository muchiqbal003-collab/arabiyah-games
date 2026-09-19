// ===== State =====
const state = {
  filter: 'all',
  search: '',
};

// ===== DOM Elements =====
const gamesGrid = document.getElementById('gamesGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const gameCards = document.querySelectorAll('.game-card');

// ===== Filter Logic =====
function applyFilters() {
  let visibleCount = 0;

  gameCards.forEach(card => {
    const categories = card.dataset.category || '';
    const name = (card.dataset.name || '').toLowerCase();
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

    const matchesFilter = state.filter === 'all' || categories.includes(state.filter);
    const matchesSearch = !state.search ||
      name.includes(state.search) ||
      title.includes(state.search) ||
      desc.includes(state.search);

    if (matchesFilter && matchesSearch) {
      card.classList.remove('hide');
      visibleCount++;
    } else {
      card.classList.add('hide');
    }
  });

  // Show/hide empty state
  if (visibleCount === 0) {
    emptyState.classList.add('show');
  } else {
    emptyState.classList.remove('show');
  }
}

// ===== Event Listeners =====
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', (e) => {
  state.search = e.target.value.trim().toLowerCase();
  applyFilters();
});

// ===== Modal Logic =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(modal) {
  modal.classList.remove('show');
}

document.getElementById('aboutBtn').addEventListener('click', () => openModal('aboutModal'));
document.getElementById('helpBtn').addEventListener('click', () => openModal('helpModal'));

document.querySelectorAll('.modal').forEach(modal => {
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Close buttons
  modal.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(modal));
  });
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => closeModal(m));
  }
});

// ===== Animasi Kartu Muncul =====
function animateCards() {
  gameCards.forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, idx * 60);
  });
}

// ===== Sound Effect (opsional) =====
function playClickSound() {
  try {
    const audio = new Audio('assets/sounds/click.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  } catch (e) {}
}

gameCards.forEach(card => {
  card.addEventListener('click', playClickSound);
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  animateCards();
  applyFilters();
});