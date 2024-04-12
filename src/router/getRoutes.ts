import {RouteRecordRaw} from "vue-router";
import {navLinkUrls} from "@/data/navLinks.ts";

export function getRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [
        {path: '/', redirect: '/slider'},
    ];

    routes.push(...navLinkUrls());

    return routes;
}
