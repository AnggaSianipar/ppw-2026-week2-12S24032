import { fetchProfile, fetchProjects, fetchServices, submitOrder } from './api-service.js';

const $ = (selector) => document.querySelector(selector);
const projectState = $('#projectsState');
const projectsGrid = $('#projectsGrid');
let projects = [];

function showToast(title, message, isError = false) {
    $('#toastTitle').textContent = title;
    $('#toastMessage').textContent = message;
    $('#feedbackToast').classList.toggle('text-bg-danger', isError);
    bootstrap.Toast.getOrCreateInstance($('#feedbackToast')).show();
}

function setState(type, message) {
    projectState.className = `ui-state ${type}`;
    projectState.replaceChildren();
    if (type === 'loading') {
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border text-primary';
        spinner.setAttribute('role', 'status');
        projectState.append(spinner);
    }
    const text = document.createElement('span');
    text.textContent = message;
    projectState.append(text);
}

function renderProjects(filter = 'all') {
    const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);
    projectsGrid.replaceChildren();
    if (!visible.length) {
        setState('empty', 'Tidak ada proyek pada kategori ini.');
        return;
    }
    setState('success', '');
    visible.forEach((project) => {
        const col = document.createElement('div');
        col.className = 'col';
        const card = document.createElement('article');
        card.className = 'card h-100 project-card border';
        const image = document.createElement('img');
        image.className = 'card-img-top project-image';
        image.src = project.image;
        image.alt = `Pratinjau ${project.title}`;
        image.loading = 'lazy';
        const body = document.createElement('div');
        body.className = 'card-body d-flex flex-column';
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary align-self-start mb-2';
        badge.textContent = project.category;
        const title = document.createElement('h5');
        title.className = 'card-title fw-bold';
        title.textContent = project.title;
        const summary = document.createElement('p');
        summary.className = 'card-text text-secondary small flex-grow-1';
        summary.textContent = project.summary;
        const button = document.createElement('button');
        button.className = 'btn btn-outline-brand btn-sm w-100 mt-2';
        button.type = 'button';
        button.dataset.projectId = project.id;
        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = '#projectModal';
        button.innerHTML = '<i class="bi bi-eye me-1" aria-hidden="true"></i> Detail Proyek';
        body.append(badge, title, summary, button);
        card.append(image, body);
        col.append(card);
        projectsGrid.append(col);
    });
}

function renderModal(project) {
    $('#projectModalLabel').textContent = project.title;
    const body = document.createElement('div');
    const description = document.createElement('p');
    description.className = 'text-secondary small';
    description.textContent = project.description;
    const tags = document.createElement('p');
    tags.className = 'small mb-2';
    tags.textContent = `Teknologi: ${project.tags.join(', ')}`;
    const metrics = document.createElement('ul');
    metrics.className = 'small mb-0';
    project.metrics.forEach((metric) => {
        const item = document.createElement('li');
        item.textContent = metric;
        metrics.append(item);
    });
    body.append(description, tags, metrics);
    $('#projectModalBody').replaceChildren(body);
    $('#projectModalLink').href = project.link;
}

function updateOrderCount() {
    const orders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
    $('#orderCount').textContent = orders.length;
}

function typeProfileName(name) // Animasi pengetikan nama profil 
{
    const nameElement = $('#profileName');
    const text = `Hi, I'm ${name}`;
    let characterIndex = 0;

    const typeNextCharacter = () => {
        nameElement.textContent = text.slice(0, characterIndex);

        if (characterIndex < text.length) {
            characterIndex += 1;
            window.setTimeout(typeNextCharacter, 180);
            return;
        }

        window.setTimeout(() => {
            nameElement.textContent = '';
            characterIndex = 0;
            typeNextCharacter();
        }, 3000);
    };

    typeNextCharacter();
}

async function loadContent() {
    try {
        const [profile, loadedProjects, services] = await Promise.all([fetchProfile(), fetchProjects(), fetchServices()]);
        projects = loadedProjects;
        typeProfileName(profile.name);
        $('#profileBio').textContent = profile.bio;
        $('#profileAbout').textContent = profile.about;
        $('#profileRole').textContent = profile.role;
        $('#profileInstitution').textContent = profile.institution;
        $('#profileImage').src = profile.image;
        $('#profileGithub').href = profile.github;
        profile.skills.forEach((skill) => { const item = document.createElement('li'); item.textContent = skill; $('#profileSkills').append(item); });
        const categories = [...new Set(projects.map((project) => project.category))];
        categories.forEach((category) => { const option = new Option(category, category); $('#categoryFilter').add(option); });
        services.forEach((service) => { const option = new Option(`${service.name} - ${service.price}`, service.id); $('#paketSelect').add(option); });
        renderProjects();
    } catch (error) {
        setState('error', 'Konten gagal dimuat. Periksa koneksi atau provider JSON.');
        showToast('Gagal memuat data', error.message, true);
    }
}

$('#categoryFilter').addEventListener('change', (event) => renderProjects(event.target.value));
$('#projectsGrid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-id]');
    if (button) renderModal(projects.find((project) => project.id === button.dataset.projectId));
});
$('#serviceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    const button = $('#submitButton');
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Mengirim...';
    const order = {
        name: $('#namaKlien').value.trim(),
        email: $('#emailKlien').value.trim(),
        phone: $('#telpKlien').value.trim(),
        startDate: $('#tglMulai').value,
        endDate: $('#tglSelesai').value,
        serviceId: $('#paketSelect').value,
        message: $('#pesanKlien').value.trim(),
        consent: $('#persetujuanCheck').checked
    };
    order.createdAt = new Date().toISOString();
    try {
        await submitOrder(order);
        const orders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
        orders.push(order);
        localStorage.setItem('serviceOrders', JSON.stringify(orders));
        updateOrderCount();
        form.reset();
        form.classList.remove('was-validated');
        showToast('Pesanan terkirim', 'Permintaan layanan berhasil disimpan.');
    } catch (error) {
        showToast('Pengiriman gagal', error.message, true);
    } finally {
        button.disabled = false;
        button.innerHTML = '<i class="bi bi-send-fill me-1"></i> Kirim Permintaan Layanan';
    }
});

const themeToggle = $('#themeToggle');
const setTheme = (isDark) => { document.body.classList.toggle('dark-theme', isDark); themeToggle.setAttribute('aria-pressed', String(isDark)); themeToggle.innerHTML = `<i class="bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}" aria-hidden="true"></i>`; };
setTheme(localStorage.getItem('theme') === 'dark');
themeToggle.addEventListener('click', () => { const isDark = !document.body.classList.contains('dark-theme'); localStorage.setItem('theme', isDark ? 'dark' : 'light'); setTheme(isDark); });
const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];
const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').slice(1);
        setActiveNav(targetId);
    });
});

const navObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (visibleSection) {
        setActiveNav(visibleSection.target.id);
    }
}, {
    rootMargin: '-90px 0px -45% 0px',
    threshold: [0.1, 0.25, 0.5, 0.75]
});

navSections.forEach((section) => navObserver.observe(section));
updateOrderCount();
loadContent();
