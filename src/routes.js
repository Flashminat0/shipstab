import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const User = React.lazy(() => import('./Views/Others/user'));
const Vessel = React.lazy(() => import('./Views/Others/vessel'));
const DashboardPage = React.lazy(() => import('./Views/Dashboard'));
const Stability = React.lazy(() => import('./Views/Stability'));


const routes = [
    { path: '/dashboard', exact: true, roles: ["Admin", "User"], name: 'Analytics', component: DashboardPage },
    { path: '/stability', exact: true, roles: ["Admin", "User"], name: 'Stability', component: Stability },
    { path: '/others/user', exact: true, roles: ["Admin"], name: 'Users', component: User },
    { path: '/others/vessel', exact: true, roles: ["Admin"], name: 'Vessels', component: Vessel }
];

export default routes;