const DATA_BASE_URL = './data/';
const ORDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function getJson(resource) {
    const response = await fetch(`${DATA_BASE_URL}${resource}`, { headers: { Accept: 'application/json' } });
    if (!response.ok) {
        throw new Error(`Provider ${resource} merespons HTTP ${response.status}.`);
    }
    return response.json();
}

export const fetchProfile = () => getJson('profile.json');
export const fetchProjects = () => getJson('projects.json');
export const fetchServices = () => getJson('services.json');

export async function submitOrder(order) {
    const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error(`REST API merespons HTTP ${response.status}.`);
    }
    return response.json();
}
