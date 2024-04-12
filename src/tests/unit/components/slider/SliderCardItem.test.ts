import SliderCardItem from '@/components/slider/SliderCreateForm.vue';
import TestHelpers from "@/tests/unit/testHelpers.ts";


describe('SliderCardItem', () => {
    test('renders correctly', () => {
        const wrapper = TestHelpers.mount(SliderCardItem, {});

        expect(wrapper.exists()).toBe(true);
    });
});
