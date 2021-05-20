export interface Config {
    config: string;
    component: string;
}

export interface DesignConfig<T> {
    config: T;
    isEdit: Boolean;
}

export interface ImgInfo {
    url: string;
    name: string;
}

export interface LinkInfo {
    name: string;
    url: string;
}

export interface MessageDataInterface {
    config: {
      component: string;
      config: string;
    },
    index: number;
    items: any[];
    pageType?: string;
    type?: string;
}

export interface ComponentConfigInterface {
    [key: string]: any;
}

export interface CustomerTextConfig {
    color: string;
    fontSize: number;
    text: string;
    textAlign: string;
}


export interface CustomerHeaderConfig {
    background: {
        imgInfo: ImgInfo;
        repeat: string;
    };
    nav: {
        list: {
            title: string;
            linkInfo: LinkInfo;
        }[];
        backgroundColor: string;
    };
    logo: {
        imgInfo: ImgInfo;
        linkInfo: LinkInfo;
        textAlign: string;
    }
}