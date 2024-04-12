import {mount, shallowMount} from '@vue/test-utils';
import vuetify from "@/config/vuetify/index.ts";
import {messageServicePlugin} from "@/service/message/index.ts";
import {Component} from "vue";

interface Options {
    global: {
        config: {
            globalProperties: object,
        },
        plugins: any[]
    }
}

export default {
    setupOptions: function (options: Options) {
        options = options || {};
        options.global = options.global || {};

        options.global.config = options.global.config || {};
        options.global.config.globalProperties = options.global.config.globalProperties || {};

        options.global.plugins = [
            vuetify,
            messageServicePlugin
        ];


        return options;
    },
    shallowMount: function (component: Component, options: any) {
        options = this.setupOptions(options);
        return shallowMount(component, options);
    },
    mount: function (component: Component, options: any) {
        options = this.setupOptions(options);
        return mount(component, options);
    }
};
