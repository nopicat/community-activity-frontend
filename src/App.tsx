import * as React from 'react';
import { useState } from 'react';
import { View, AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {
    // TODO pages
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activePanel, setActivePanel] = useState('home');

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel={activePanel}>
                        <Home id="home"/>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
