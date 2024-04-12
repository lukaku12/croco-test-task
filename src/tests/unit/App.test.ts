import { describe, it, expect} from "vitest";
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Layout from '@/components/layouts/Layout.vue';
import ApiMessages from '@/components/FlashMessages.vue';
import {RouterView} from "vue-router";

describe('App', () => {
    it('render Layout and ApiMessages components with router-view slot', () => {
        const wrapper = shallowMount(App, {
            global: {
                components: {
                    Layout,
                    RouterView,
                    ApiMessages
                }
            }
        });

        expect(wrapper.findComponent(Layout).exists()).toBe(true);

    });
});
