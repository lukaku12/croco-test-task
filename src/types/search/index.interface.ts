import {navLinkUrls} from "@/data/navLinks.ts";


const allowedKeys: string[] = [];

navLinkUrls().forEach((navLink) => {
    allowedKeys.push(navLink.name);
})

export type SearchType = {
    [key in typeof allowedKeys[number]]?: string;
};
