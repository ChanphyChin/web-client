import { CSSProperties } from 'react';
import { useHistory } from 'react-router';

interface CustomerTextProps {
    config: {
        url?: string;
        text: string;
        color: string;
        textAlign: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
        fontSize: number;
    };
    isEdit: Boolean;
}

export const CustomerText = (props: CustomerTextProps) => {
    const history = useHistory();
    const { text, color, fontSize, textAlign } = props.config;
    const style: CSSProperties = {
        fontSize: `${fontSize}px`,
        color,
    };
    const onClick = () => {
        const { config: { url } } = props;
        if(url) {
            history.push(url);
        }
    }
    if(JSON.stringify(props.config) === '{}' && props.isEdit) {
        return(
          <div onClick={onClick} style={{ textAlign }}>
            {JSON.stringify(props.config) === '{}' && (
                <span style={{ fontSize: 16, color: 'rgb(202 202 202)' }}>点击编辑Text</span>
            )}
          </div>
        );
      }
      if(JSON.stringify(props.config) === '{}' && !props.isEdit) {
        return null;
    }
    console.log(text);
    return (
        <div style={{ textAlign }} onClick={onClick}>
            <span style={style}>{text}</span>
        </div>
    );
}
