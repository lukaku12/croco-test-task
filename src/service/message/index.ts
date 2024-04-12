import {ref, InjectionKey, App} from 'vue';

interface Message {
    id: number;
    text: string;
    type: 'success' | 'error' | 'info';
}

class MessageService {
    messages = ref<Message[]>([]);
    messageId = 0;

    deleteMessage(id: number) {
        this.messages.value = this.messages.value.filter((msg) => msg.id !== id);
    }

    showMessage(text: string, type: 'success' | 'error' | 'info') {
        const message: Message = {id: this.messageId++, text, type};
        this.messages.value.push(message);
        setTimeout(() => {
            this.deleteMessage(message.id);
        }, 3000); // Hide message after 3 seconds
    }
}

// Define InjectionKey
export const messageServiceKey: InjectionKey<MessageService> = Symbol();

// Create a plugin
export const messageServicePlugin = {
    install: (app: App<Element>) => {
        const messageService = new MessageService();
        app.provide(messageServiceKey, messageService);
    },
};
