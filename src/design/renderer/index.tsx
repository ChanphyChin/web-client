import { CustomerText } from '../components/customer-text';

export { Parser } from './parser';

interface RendererProps {
    config: any;
    component: string;
}

export const Renderer = (props: RendererProps) => {
    const { config, component } = props;
    switch(component) {
        case 'customerText' : {
            return <CustomerText config={config}/>
        }
        default: 
        return null;
    }
}