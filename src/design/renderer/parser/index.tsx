import { CustomerText, CustomerHeader } from '../../components';

interface RendererProps {
    config: any;
    component: string;
    isEdit?: Boolean;
}

export const Parser = (props: RendererProps) => {
    const config = JSON.parse(props.config);
    switch(props.component) {
        case 'CustomerText' : {
            return <CustomerText config={config} isEdit={props.isEdit as Boolean} />;
        }
        case 'CustomerHeader' : {
            return <CustomerHeader config={config} isEdit={props.isEdit as Boolean} />;
        }
        default: 
        return null;
    }
}