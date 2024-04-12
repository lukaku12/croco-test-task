import Component from '@/components/FlashMessages.vue';
import {messageServiceKey} from "@/service/message";
import {mount} from "@vue/test-utils";
import {vitest} from "vitest";
import {VBtn} from "vuetify/components"; // Replace with the correct path to your component

describe('Flash Messages', () => {
    it('renders messages correctly', async () => {
        // Mock message service
        const messageService = {
            messages: [
                {id: 1, text: 'Message 1', type: 'info'},
                {id: 2, text: 'Message 2', type: 'error'},
            ],
            deleteMessage: vitest.fn(),
        };

        // Mount the component with mocked message service
        const wrapper = mount(Component, {
            global: {
                provide: {
                    [messageServiceKey]: messageService, // Corrected the key to use messageServiceKey variable
                },
                stubs: ['v-btn'], // Stub any child components not being tested
            },
        });

        // Wait for next tick to ensure DOM updates
        await wrapper.vm.$nextTick();

        // Assert that messages are rendered correctly
        const messageElements = wrapper.findAll('.msg-box');
        expect(messageElements).toHaveLength(messageService.messages.length);
        messageService.messages.forEach((message, index) => {
            const messageElement = messageElements[index];
            expect(messageElement.text()).toContain(message.text);
            expect(messageElement.classes()).toContain(message.type);
        });
    });

    it('calls deleteMessage method when close button is clicked', async () => {
        // Mock message service
        const messageService = {
            messages: [
                {id: 1, text: 'Message 1', type: 'info'},
                {id: 2, text: 'Message 2', type: 'error'},
            ],
            deleteMessage: vitest.fn(),
        };

        // Mount the component with mocked message service
        const wrapper = mount(Component, {
            global: {
                provide: {
                    [messageServiceKey]: messageService,
                },
                stubs: {
                    VBtn: true
                }
            },
        });

        // Wait for next tick to ensure DOM updates
        await wrapper.vm.$nextTick();

        // Simulate click on close button
        wrapper.findAllComponents(VBtn).forEach((btn) => {
            btn.trigger('click')
        })

        // Wait for next tick to ensure DOM updates
        await wrapper.vm.$nextTick();

        // Assert that deleteMessage method is called with correct arguments
        expect(messageService.deleteMessage).toHaveBeenCalledTimes(messageService.messages.length);
        expect(messageService.deleteMessage).toHaveBeenCalledWith(messageService.messages.length); // Assuming message id is 1
    });
});
