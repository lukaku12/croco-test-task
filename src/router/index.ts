import {createRouter, createWebHistory} from "vue-router";
import {getRoutes} from "@/router/getRoutes";


const router = createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
});


export default router;
