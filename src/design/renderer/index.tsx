import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { EditableRenderer } from './editable-renderer';
import { DisplayRenderer } from './display-renderer';
import { MessageDataInterface } from '../types';
import { getQueryVariable } from '../../services';


export const Renderer = (props: { pageConfig: MessageDataInterface }) => {
    const [type, setType] = useState<string|undefined>('');
    const location = useLocation();
    const [pageConfig, setPageConfig] = useState<MessageDataInterface>();
    useEffect(() => {
        const routeSearchParams = getQueryVariable(location.search.substring(1));
        setType(routeSearchParams.type);
    }, []);
    useEffect(() => {
      const { pageConfig } = props;
      setPageConfig(pageConfig);
    }, [props.pageConfig]);
    if(type === 'edit') {
        return <EditableRenderer pageConfig={pageConfig as MessageDataInterface} />
    }
    return <DisplayRenderer pageConfig={pageConfig as MessageDataInterface} />;
}

export { Parser } from './parser';