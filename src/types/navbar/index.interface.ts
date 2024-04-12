import {Component} from "vue";

export type NavLinkUrls = {
    name: string,
    path: string,
    component: Component,
}

export type MetaData = {
    id: number,
    title: string,
    icon: Component,
    name: string
}

export type NavLinks = MetaData & NavLinkUrls;