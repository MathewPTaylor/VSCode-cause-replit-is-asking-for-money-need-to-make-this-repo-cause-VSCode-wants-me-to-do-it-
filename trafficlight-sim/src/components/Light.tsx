import React from 'react'
import { useState } from 'react';

interface LightProps {
    colour: string;
    isOn?: boolean;
    onClick: () => void;
}

function Light({colour, onClick, isOn=false}: LightProps) {
  return (
        <div onClick={onClick}  className={["light", colour, isOn? "" : "off"].join(" ")}></div>
  )
}

export default Light