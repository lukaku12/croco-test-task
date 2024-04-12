import 'vuetify/styles';
import {createVuetify, ThemeDefinition} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#0E9F6E',
    },
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme
        }
    }
})

export default vuetify;
