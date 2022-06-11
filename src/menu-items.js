export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            roles: ["Admin", "User"],
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    classes: 'nav-item',
                    icon: 'feather icon-home',
                    roles: ["Admin", "User"]
                },
                {
                    id: 'stability',
                    title: 'Stability',
                    type: 'item',
                    url: '/stability',
                    classes: 'nav-item',
                    icon: 'feather icon-activity',
                    roles: ["Admin", "User"]
                },
                {
                    id: 'other',
                    title: 'Others',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    badge: {
                        title: 'New',
                        type: 'badge-warning'
                    },
                    roles: ["Admin"],
                    children: [
                        {
                            id: 'user',
                            title: 'Users',
                            type: 'item',
                            url: '/others/user',
                            roles: ["Admin"]
                        },
                        {
                            id: 'vessel',
                            title: 'Vessels',
                            type: 'item',
                            url: '/others/vessel',
                            roles: ["Admin"]
                        }
                    ]
                }
            ]
        }
    ]
}