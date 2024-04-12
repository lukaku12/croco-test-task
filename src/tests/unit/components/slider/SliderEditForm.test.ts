import SliderEditForm from "@/components/slider/SliderEditForm.vue";
import TestHelpers from "@/tests/unit/testHelpers.ts";

describe('SliderEditForm', () => {

    const options = {
        props: {
            data: {
                id: 1,
                title: {
                    en: 'English Title',
                    ka: 'Georgian Title',
                },
                'image': '',
                date: '2024-04-12',
            },
        },
    }

    test('renders correctly', () => {
        const wrapper = TestHelpers.mount(SliderEditForm, options);

        expect(wrapper.exists()).toBe(true);
    });
    
});
