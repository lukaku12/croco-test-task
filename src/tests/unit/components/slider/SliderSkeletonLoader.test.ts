import SliderSkeletonLoader from "@/components/slider/SliderSkeletonLoader.vue";
import testHelpers from "@/tests/unit/testHelpers.ts";

describe('SliderSkeletonLoader', () => {
    test('renders skeleton loaders correctly', () => {
        const wrapper = testHelpers.mount(SliderSkeletonLoader, {});

        expect(wrapper.exists()).toBe(true);

        const skeletonLoaders = wrapper.findAll('.v-skeleton-loader');
        expect(skeletonLoaders.length).toBe(5); // Adjust the number if it changes
    });
});
