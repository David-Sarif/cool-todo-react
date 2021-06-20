import React from 'react'
import './Badge.scss'
import classNames from 'classnames'


// {`badge badge--${color} ${className}`}

const Badge = ({color, onClick, className}) => {
return(
    <i onClick={onClick} className={classNames(`badge`, `badge--${color}`, className )}></i>
)
}

export default Badge
