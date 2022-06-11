import React from 'react';

const SignIn = React.lazy(() => import('./Views/Auth/SignIn'));
const Error = React.lazy(() => import('./Demo/Maintenance/Error'));
const OfflineUI = React.lazy(() => import('./Demo/Maintenance/OfflineUI'));
const ComingSoon = React.lazy(() => import('./Demo/Maintenance/ComingSoon'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn },
    { path: '/maintenance/error', exact: true, name: 'Error', component: Error },
    { path: '/maintenance/coming-soon', exact: true, name: 'Coming Soon', component: ComingSoon },
    { path: '/maintenance/offline-ui', exact: true, name: 'Offline UI', component: OfflineUI },
];

export default route;