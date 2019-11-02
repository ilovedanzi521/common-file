import asyncChunks from "../async-chunks";

let routers = [
    {
        path: "/",
        name: "layout",
        component: () => asyncChunks.winBiz("Layout"),
        children: [
            {
                path: "/directional",
                name: "directional",
                component: asyncChunks.Directional
            }
        ]
    }
];

const routerChildren = [
    {
        path: "/file",
        name: "File",
        component: asyncChunks.File
    }
];

if ("development" === process.env.NODE_ENV) {
    routerChildren.forEach(item => {
        routers[0].children.push(item);
    });
    localStorage.setItem("Authorization", "development");
} else {
    routerChildren.forEach(item => {
        if (item.children) {
            routers.push({ ...item, children: item.children });
        } else {
            routers.push({ ...item, children: [] });
        }
    });
}
export default routers;
