'use client';
import { useMount } from 'react-use';
import { useState } from 'react';

export default function Banner() {
  const [messages, setMessages] = useState<string[]>([]);

  return <div>Big Banner</div>;
}
