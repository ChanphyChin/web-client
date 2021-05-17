import { Renderer } from '../../design';

export const Home = () => {
    const configs = [
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
            {configs.map(config => (
                <Renderer {...config} />
            ))}
        </div>
    );
}
