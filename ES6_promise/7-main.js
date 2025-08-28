import loadBalancer from './7-load_balancer.js';

// deux promesses pour simuler des temps de réponse différents
const china = new Promise((resolve) => setTimeout(() => resolve('China wins'), 200));
const US = new Promise((resolve) => setTimeout(() => resolve('US wins'), 100));

loadBalancer(china, US).then((value) => console.log(value));
