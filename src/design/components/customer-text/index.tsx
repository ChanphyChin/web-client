import React from 'react';

export const CustomerText = (props: { config: any }) => {
    const { text, color, textAlign, fontSize } = props.config;
    return (
        <div style={{ textAlign }}>
        <span style={{ color, fontSize }}>{text}</span>
        </div>
    );
}
