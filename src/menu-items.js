export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    classes: 'nav-item',
                    icon: 'feather icon-home'
                },
                {
                    id: 'stability',
                    title: 'Stability',
                    type: 'item',
                    url: '/stability',
                    classes: 'nav-item',
                    icon: 'feather icon-activity'
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
                    children: [
                        {
                            id: 'user',
                            title: 'Users',
                            type: 'item',
                            url: '/others/user'
                        },
                        {
                            id: 'vessel',
                            title: 'Vessels',
                            type: 'item',
                            url: '/others/vessel'
                        }
                    ]
                }
            ]
        }
    ]
}