
const menuGrid = document.getElementById('menuGrid');
const DATA_PATH = './data.json'; // adjust path if needed

function createCard(item) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-3 mb-4';

  const card = document.createElement('div');
  card.className = 'shadow menu-item-card p-3 h-100';

  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title;
  img.className = 'menu-item-image w-100 mb-3';
  img.loading = 'lazy';

  const title = document.createElement('h3');
  title.className = 'menu-card-title';
  title.textContent = item.title;

  const desc = document.createElement('p');
  desc.className = 'menu-item-description text-muted';
  desc.textContent = item.description;

  const priceRow = document.createElement('div');
  priceRow.className = 'd-flex justify-content-between align-items-center mt-3';
  const price = document.createElement('div');
  price.className = 'fw-bold';
  price.textContent = `₹ ${item.price}`;

  const action = document.createElement('a');
  action.href = '#';
  action.className = 'menu-item-link';
  action.innerHTML = 'View <i class="fas fa-arrow-right"></i>';

  priceRow.appendChild(price);
  priceRow.appendChild(action);

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(priceRow);

  col.appendChild(card);
  return col;
}

async function loadMenu() {
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error('Failed to fetch data.json: ' + res.status);
    const data = await res.json();
    const menu = Array.isArray(data.menu) ? data.menu : [];
    menuGrid.innerHTML = '';

    if (menu.length === 0) {
      menuGrid.innerHTML = '<div class="col-12"><p class="text-muted">No menu items found.</p></div>';
      return;
    }

    menu.forEach(item => {
      const card = createCard(item);
      menuGrid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    menuGrid.innerHTML = `<div class="col-12"><p class="text-danger">Error loading menu data: ${err.message}</p></div>`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
});
