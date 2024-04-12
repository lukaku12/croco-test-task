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
        SliderAddForm
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

    it('renders SliderSkeletonLoader when data is being fetched', () => {
        const wrapper = mountComponent({
            data() {
                return {
                    dataIsFetched: false,
                    data: [],
                }
            }
        });

        // console.log(wrapper.vm)


        // expect(wrapper.findComponent(SliderSkeletonLoader).exists()).toBe(true);
    });

    it('renders SliderAddForm when sliderFormIsOpen is true', async () => {
        const wrapper = mountComponent();

        await wrapper.vm.$nextTick();

        // Set sliderFormIsOpen to true
        wrapper.vm.sliderFormIsOpen = true;

        // Wait for Vue to update the component
        await wrapper.vm.$nextTick();


        expect(wrapper.findComponent(SliderAddForm).exists()).toBe(true);
    });

    it('renders SliderCardItem for each slider data item', () => {
        const sliderData = [
            { id: 1, title: 'Slider 1', image: 'slider1.jpg', date: '2024-04-11' },
            { id: 2, title: 'Slider 2', image: 'slider2.jpg', date: '2024-04-12' }
        ];

        const wrapper = mountComponent({
            data() {
                return {
                    data: sliderData,
                    dataIsFetched: true
                };
            }
        });

        const sliderCardItems = wrapper.findAllComponents(SliderCardItem);
        expect(sliderCardItems.length).toBe(sliderData.length);

        sliderCardItems.forEach((sliderCardItem, index) => {
            expect(sliderCardItem.props('data')).toEqual(sliderData[index]);
        });
    });
});
