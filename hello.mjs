import { connect } from '@alini/messaging-core';

const client = await connect({
  gatewayUrl: process.env.NEOND_GATEWAY_URL ?? 'ws://127.0.0.1:8092',
  credentials: { trustedLocalSubject: 'my-first-agent' },
});
const channel = await client.namespace('demo').ensureChannel('hello');
const messages = channel.subscribe();
await messages.ready;

await channel.publish(new TextEncoder().encode('Hello from my agent!'));
const { value } = await messages.next();
console.log(new TextDecoder().decode(value.payload));

await client.close();
