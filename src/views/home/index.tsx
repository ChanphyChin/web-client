import { useEffect, useState } from 'react';

import { api, IframeManager } from '../../services';
import { Renderer } from '../../design';
import { MessageDataInterface } from '../../types';

export const Home = () => {
    const [configs, setConfigs] = useState<MessageDataInterface>();
    useEffect(() => {
        api.get({
            apiPath: '/client/config',
            params: {
              pageType: 'home'
            }
          }).then((pageConfig: MessageDataInterface) => {
            setConfigs(pageConfig);
            pageConfig.config = { component: '', config: '' };
            IframeManager.postMessage(pageConfig);
          });
    },[]);
    return (
        <div>
            <Renderer pageConfig={configs as MessageDataInterface} />
        </div>
    );
}
