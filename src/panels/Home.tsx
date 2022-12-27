import * as React from 'react';
import { Panel, PanelHeader, Header, Button, Group, Div, Avatar, Text, Snackbar } from '@vkontakte/vkui';
import { Icon16Done } from "@vkontakte/icons";
import bridge from '@vkontakte/vk-bridge';
import screenshot from '../img/screenshot.png';
import axios from 'axios';

function Home({ id }: { id: string }) {
    const [snackbar, setSnackbar] = React.useState<React.ReactElement | null>(null);

    const addToCommunity = async () => {
        const addedGroup = await bridge.send('VKWebAppAddToCommunity');

        const token = await bridge.send('VKWebAppGetCommunityToken', {
            group_id: +addedGroup.group_id,
            app_id: Number(process.env.REACT_APP_VK_ID as string),
            scope: 'app_widget,manage',
        });

        await axios.post(process.env.REACT_APP_BACKEND_URL as string + '/community/add', {
            token: token.access_token,
            groupId: +addedGroup.group_id,
        });

        setSnackbar(
            <Snackbar
                onClose={() => setSnackbar(null)}
                before={
                    <Avatar
                        size={24}
                        style={{ background: "var(--vkui--color_background_accent)" }}
                    >
                        <Icon16Done fill="#fff" width={14} height={14} />
                    </Avatar>
                }
            >
                Сообщество добавлено
            </Snackbar>
        );
    };

    return (
        <Panel id={id}>
            <PanelHeader>Активность</PanelHeader>

            <Group header={<Header mode="secondary">Что это такое?</Header>}>
                <Div>
                    <Text weight='3'>
                        Вы можете добавить в своё сообщество виджет для отображения таблицы
                        самых активных участников.
                    </Text>

                    <Text weight='3' style={{ marginTop: '10px' }}>
                        За каждый лайк и комментарий в группе участнику
                        добавляются баллы, которые поднимают его в топе.
                    </Text>
                </Div>

                <Div>
                    <img
                        src={screenshot}
                        alt='Скриншот примера'
                        style={{ borderRadius: '10px', marginTop: '10px' }}
                        height='100%'
                        width='100%'
                    />
                </Div>
            </Group>

            <Group header={<Header mode="secondary">Добавить в сообщество</Header>}>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={addToCommunity}>
                        Добавить
                    </Button>
                </Div>
            </Group>

            {snackbar}
        </Panel>
    );
}

export default Home;
