import Header from "@/components/Header.vue";
import TestHelpers from "@/tests/unit/testHelpers.ts";
import {ref} from "vue";

vi.mock('vue-router');

describe('Header', () => {
    test('renders correctly', () => {
        const wrapper = TestHelpers.mount(Header, {
            setup() {
                const search = ref({});

                return {search};
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('renders search input with placeholder', () => {
        const wrapper = TestHelpers.mount(Header, {
            setup() {
                const search = ref({});
                return {search};
            }
        });
        const searchInput = wrapper.find('.search-input input');
        expect(searchInput.attributes('placeholder')).toBe('ძიება');
    });
});
