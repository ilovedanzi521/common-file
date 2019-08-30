import File from "@/page/file/view/FileExchange.vue";
import Info from "@/page/file/view/Tabs.vue";
let routers = [
    {
        path: "/file",
        name: "File",
        component: File,
        children: [
            {
                path: "/file",
                name: "File",
                component: File
            }
        ]
    }
];

export default routers;
