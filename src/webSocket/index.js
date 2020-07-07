let Socket = ''
let setIntervalWesocketPush = null

export const initWebSocket = userid => {
  //初始化websocket
  console.log(userid+'index中userid')
  const wsurl = "ws://localhost:10000/imserver/" + userid;
  Socket = new WebSocket(wsurl);
  // this.websock = new WebSocket('ws://echo.websocket.org/echo');
  Socket.onmessage = websocketonmessage;
  Socket.onopen = websocketonopen ;
  Socket.onerror = websocketonerror;

  Socket.onclose = websocketclose;
}

export const websocketonopen = message =>{ //连接建立之后执行send方法发送数据
  let actions = {"test":message};
  websocketsend(JSON.stringify(actions));
  console.log('ws连接状态：' + Socket.readyState);
}

export const websocketonerror= () =>{//连接建立失败重连
  initWebSocket();
}
export const websocketonmessage = e =>{ //数据接收
  console.log("接收数据接收");
  console.log("接收："+e.data+'==============');

  return e.data
}
export const websocketsend = Data =>{//数据发送
  Socket.send(Data);
}

export const websocketclose = e =>{  //关闭
  console.log('断开连接',e);
}

export const websocketClose=()=>{
  console.log('断开连接了呢');
  Socket.close() //离开路由之后断开websocket连接
}
