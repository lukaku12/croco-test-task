import IconContent from "@/components/icons/navbar/IconContent.vue";
import IconParameters from "@/components/icons/navbar/IconParameters.vue";
import IconAdmins from "@/components/icons/navbar/IconAdmins.vue";
import IconLeaderboard from "@/components/icons/navbar/IconLeaderboard.vue";
import IconCalendar from "@/components/icons/navbar/IconCalendar.vue";
import IconPartners from "@/components/icons/navbar/IconPartners.vue";
import IconPhotoGallery from "@/components/icons/navbar/IconPhotoGallery.vue";
import IconVideoGallery from "@/components/icons/navbar/IconVideoGallery.vue";
import IconSlider from "@/components/icons/navbar/IconSlider.vue";
import IconNews from "@/components/icons/navbar/IconNews.vue";
import IconMenu from "@/components/icons/navbar/IconMenu.vue";
import Slider from "@/views/slider/index.vue";
import Content from "@/views/content/index.vue";
import Parameters from "@/views/parameters/index.vue";
import Admins from "@/views/admins/index.vue";
import Leaderboard from "@/views/leaderboard/index.vue";
import Calendar from "@/views/calendar/index.vue";
import Partners from "@/views/partners/index.vue";
import PhotoGallery from "@/views/photo-gallery/index.vue";
import VideoGallery from "@/views/video-gallery/index.vue";
import News from "@/views/news/index.vue";
import Menu from "@/views/menu/index.vue";
import {MetaData, NavLinks, NavLinkUrls} from "@/types/navbar/index.interface.ts";

const navLinks: NavLinks[] = [
    {
        id: 1,
        title: 'კონტენტი',
        icon: IconContent,
        path: '/content',
        name: 'content',
        component: Content,
    },
    {
        id: 2,
        title: 'პარამეტრები',
        icon: IconParameters,
        path: '/parameters',
        name: 'parameters',
        component: Parameters
    },

    {
        id: 3,
        title: 'ადმინები',
        icon: IconAdmins,
        path: '/admins',
        name: 'admins',
        component: Admins
    },
    {
        id: 4,
        title: 'ლიდერბორდი',
        icon: IconLeaderboard,
        path: '/leaderboard',
        name: 'leaderboard',
        component: Leaderboard
    },

    {
        id: 5,
        title: 'კალენდარი',
        icon: IconCalendar,
        'path': '/calendar',
        name: 'calendar',
        component: Calendar
    },
    {
        id: 6,
        title: 'პარტნიორები',
        icon: IconPartners,
        'path': '/partners',
        name: 'partners',
        component: Partners
    },


    {
        id: 7,
        title: 'ფოტო გალერეა',
        icon: IconPhotoGallery,
        path: '/photo-gallery',
        name: 'photo-gallery',
        component: PhotoGallery
    },
    {
        id: 8,
        title: 'ვიდეო გალერეა',
        icon: IconVideoGallery,
        path: '/video-gallery',
        name: 'video-gallery',
        component: VideoGallery
    },

    {
        id: 9,
        title: 'სლაიდერი',
        icon: IconSlider,
        path: '/slider',
        name: 'slider',
        component: Slider
    },
    {id: 10, title: 'სიახლეები', icon: IconNews, path: '/news', name: 'news', component: News},

    {id: 11, title: 'მენიუ', icon: IconMenu, path: '/menu', name: 'menu', component: Menu},
]

export function headerMetaData(): MetaData[] {
    const metaData: MetaData[] = [];

    for (let i = 0; i < navLinks.length; i++) {
        metaData.push({
            id: navLinks[i].id,
            title: navLinks[i].title,
            icon: navLinks[i].icon,
            name: navLinks[i].name,
        })
    }
    return metaData;
}


export function navLinkUrls(): NavLinkUrls[] {
    const urls: NavLinkUrls[] = [];

    for (let i = 0; i < navLinks.length; i++) {
        urls.push({
            name: navLinks[i].name,
            path: navLinks[i].path,
            component: navLinks[i].component,
        })
    }
    return urls;
}


