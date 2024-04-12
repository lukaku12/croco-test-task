import SliderCreateForm from '@/components/slider/SliderCreateForm.vue';
import TestHelpers from "@/tests/unit/testHelpers.ts";

describe('SliderCreateForm', () => {

    test('renders correctly', () => {
        const wrapper = TestHelpers.mount(SliderCreateForm, {});
        expect(wrapper.exists()).toBe(true);
    });

});
