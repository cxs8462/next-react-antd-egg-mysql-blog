import React,{useState,useEffect} from 'react'
import {FieldTimeOutlined,SlidersOutlined} from '@ant-design/icons'
import {List} from 'antd'
import {CSSTransition} from 'react-transition-group'
import Link from 'next/link'
import marked from 'marked'
import heighli from 'highlight.js'

const Lists=function (props){
    const renderer=new marked.Renderer()
    const [inout,setInout]=useState(false)
    useEffect(()=>{
      setInout(true)
    },[])
    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        highlight:function(code){
            return heighli.highlightAuto(code).value
        }
  })
    const [alist,setAlist]=useState(props.List)
    return (
            <div className='list'>
                <List
                    header={<h3 style={{paddingLeft:'1rem'}}>{props.name}</h3>}
                    itemLayout="vertical"
                    dataSource={alist}
                    renderItem={item => (
                        <CSSTransition
                        in={inout}
                            classNames='fade'
                            timeout={1000}
                            unmountOnExit={true}
                            >
                        <List.Item>
                            <div className="list-title"><Link prefetch href={{pathname:'/actricle',query:{id:item.id}}}><a>{item.title}</a></Link></div>
                            <div className="list-icon">
                            <span><FieldTimeOutlined /> {item.time}</span>
                            <span><SlidersOutlined />{item.typeName}</span>
                            </div>
                            <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>  
                        </List.Item>
                        </CSSTransition>
                    )}
                    />    
            </div>
          )
}
export default Lists