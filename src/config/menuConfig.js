const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'icon-home', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/products',
        icon: 'icon-appstore',
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: 'icon-fenlei'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'icon-banshou'
            },
        ]
    },

    {
        title: '用户管理',
        key: '/user',
        icon: 'icon-user'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'icon-safety',
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: 'icon-area-chart',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'icon-barchart'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'icon-linechart'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'icon-piechart'
            },
        ]
    },

    {
        title: '订单管理',
        key: '/order',
        icon: 'icon-windows',
    },
]

export default menuList
