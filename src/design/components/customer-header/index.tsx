import { Menu } from 'antd';
import './index.scss';

const config = {
  background: {
    pic: 'http://localhost:4000/static/images/1621409312899-1920-150.jpg',
    repeat: 'no-repeat',
  },
  nav: {
    list: [
      {
        name: 'Nav',
        linkInfo: {
          name: 'home',
          url: 'home'
        }
      }
    ],
    backgroundColor: '#fff'
  },
  logo: {
    pic: 'http://localhost:4000/static/images/1620972886595-731595574509_.pic.jpg',
    linkInfo: {
      name: 'home',
      url: ''
    },
    textAlign: 'center'
  }
};

interface CustomerHeaderProps {
  config: any;
  isEdit: Boolean;
}

export const CustomerHeader = (props: CustomerHeaderProps) => {
  return (
    <div style={{ background: `url(${config.background.pic}) ${config.background.repeat}` }} className='customer-header'>
      <div className='customer-header-logo' style={{ textAlign: config.logo.textAlign as any }}>
        <img src={config.logo.pic}/>
      </div>
      <div className='customer-header-menu' style={{ background: config.nav.backgroundColor }}>
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}
