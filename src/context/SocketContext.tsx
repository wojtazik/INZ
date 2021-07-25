import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import socketio from "socket.io-client";
import processData from '../util/processData';

const SocketContext = React.createContext(null)

export function useIO() {
  const context  = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useContext must be used with ContextIO provider')
  }

  return context
}

function ContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  let [io, setIo] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
        //@ts-ignore
        const connection = await socketio.connect('ws://localhost:3001')
        setIo(connection)
    })()
  }, [])

  useEffect(() => {
    if (io) {
      // @ts-ignore
      io.on('connection', () => {
        console.info(`Connected with websocket on: ${'ws://localhost:3001'}`)
      })

      //@ts-ignore
      io.on('refresh.data', (resp) => {
        if (resp.success) {
          processData(dispatch, resp)
        }
      })
    }
  }, [io])

  return io ? (
    <SocketContext.Provider value={io}>
      {children}
    </SocketContext.Provider>  
  ) : null
}

const ContextIOProvider = React.memo(ContextProvider, () => true)

export {
  ContextIOProvider
}
