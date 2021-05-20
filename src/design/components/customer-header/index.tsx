import { useMemo } from 'react';
import { Menu } from 'antd';
import './index.scss';
import { CustomerHeaderConfig, DesignConfig } from '../../types';

export const CustomerHeader = (props: DesignConfig<CustomerHeaderConfig>) => {
  const renderMenuList = useMemo(() => {
    return props.config.nav.list.map(item => {
      return <Menu.Item key={item.linkInfo.url}>{item.title}</Menu.Item>;
    })
  }, [props.config.nav.list]);
  return (
    <div style={{ background: `url(${props.config?.background.imgInfo.url}) ${props.config?.background.repeat}` }} className='customer-header'>
      <div className='customer-header-logo' style={{ textAlign: props.config?.logo.textAlign as any }}>
        <img src={props.config?.logo.imgInfo.url}/>
      </div>
      <div className='customer-header-menu' style={{ background: props.config.nav?.backgroundColor }}>
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          {renderMenuList}
        </Menu>
      </div>
    </div>
  );
}
