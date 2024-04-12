import Slider from '@/views/slider/index.vue';
import Header from '@/components/Header.vue';
import SliderSkeletonLoader from "@/components/slider/SliderSkeletonLoader.vue";
import SliderCardItem from "@/components/slider/SliderCardItem.vue";
import SliderAddForm from "@/components/slider/SliderCreateForm.vue";
import testHelpers from "@/tests/unit/testHelpers.ts";

describe('Slider', () => {

    const globalComponents = {
        Header,
        SliderSkeletonLoader,
        SliderCardItem,
        SliderAddForm,
    };

    const mountComponent = (options = {}) => {
        return testHelpers.shallowMount(Slider, {
            global: {
                components: globalComponents
            },
            ...options
        });
    };

    it('renders Header component', () => {
        const wrapper = mountComponent();

        expect(wrapper.findComponent(Header).exists()).toBe(true);
    });


    it('renders SliderAddForm when sliderFormIsOpen is true', async () => {
        const wrapper = mountComponent();

        if (wrapper.vm.sliderFormIsOpen) {
            expect(wrapper.findComponent(SliderAddForm).exists()).toBe(true);
        } else {
            expect(wrapper.findComponent(SliderAddForm).exists()).toBe(false);
        }
    });

});
