import bridge from '@vkontakte/vk-bridge';
import {Button, Div} from '@vkontakte/vkui';
import {getRandomImage} from "../utils/randomPic.js";

export const VkStory = () => {
    const openStoryEditor = async () => {
        try {
            const imageUrl = await getRandomImage()

            await bridge.send("VKWebAppShowStoryBox", {
                background_type: "image",
                url: imageUrl,
                locked: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Div>
            <Button size="l" stretched onClick={openStoryEditor}>
                {'Открыть редактор историй'}
            </Button>
        </Div>
    );
};