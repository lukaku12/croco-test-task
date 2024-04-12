import TestHelpers from "@/tests/unit/testHelpers.ts";
import Navbar from "@/components/Navbar.vue";
import {vi} from "vitest";

vi.mock('vue-router');

describe('Navbar', () => {
    it('should render correctly', () => {
        const wrapper = TestHelpers.mount(Navbar, {
            global: {
                stubs: {
                    'router-link': true,
                    'v-navigation-drawer': true,
                },
            }
        });
        expect(wrapper.exists()).toBe(true);
    });


});
