import { Renderer } from '../../design';

export const Home = () => {
    const config = [
        {
            component: 'customerText',
            config: {
                text: 'this is text',
                fontSize: 20,
                color: '#000',
                textAlign: 'center'
            }
        }
    ];
    return (
        <div>
            <Renderer />
        </div>
    );
}
