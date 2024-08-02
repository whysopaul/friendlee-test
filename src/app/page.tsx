'use client'

import { useEffect, useRef } from "react"

export default function Home() {

  const socket = useRef<WebSocket | null>(null)

  const wsConnect = () => {
    socket.current = new WebSocket('ws://localhost:3001')
    socket.current.onopen = () => console.log('socket opened')
    socket.current.onmessage = (ev) => console.log(ev.data)
  }

  useEffect(() => {
    wsConnect()

    return () => {
      socket.current?.close()
    }
  })

  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
}
