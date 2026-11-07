# NeonD SDK

Publish and receive messages from Node.js applications and agents. Requires Node.js 24.

```sh
npm install https://github.com/neonexia/neond-sdk/releases/download/v0.1.2/neond-sdk-0.1.2.tgz
```

## Send and receive text

Start NeonD, then create a namespace and send a message using the SDK:

```js
import { connect } from '@alini/messaging-core';

const client = await connect({
  gatewayUrl: 'ws://127.0.0.1:8092',
  administration: { url: 'http://127.0.0.1:8080' },
  credentials: { trustedLocalSubject: 'my-agent' },
});
try {
  const namespace = await client.createNamespace('demo');
  const channel = await namespace.ensureChannel('hello');
  const messages = channel.subscribe();
  await messages.ready;
  await channel.publish('Hello from my agent!');
  const { value } = await messages.next();
  console.log(value.text());
} finally {
  await client.close();
}
```

The local identity above is for a trusted development deployment.

## Text and bytes

`publish()` accepts a string, Uint8Array or Node.js Buffer. Strings use UTF-8.
`message.text()` reads UTF-8 text; `message.payload` returns the original bytes.
Invalid UTF-8 bytes appear as replacement characters in text, without changing
the payload. Message size limits apply to encoded bytes.

For JSON, publish `JSON.stringify(value)` and read `JSON.parse(message.text())`.
NeonD does not require a JSON schema.

## Choose how to receive messages

- `subscribe()` receives new messages while connected.
- `subscribe({ autoAck: true, startSequence: 1 })` reads saved messages from
  the first position, then continues listening. Receipt is acknowledged
  automatically; it does not wait for your processing.
- `subscribe({ durable: 'worker' })` remembers progress on the server. Call
  `await message.ack()` after successful processing. Unacknowledged messages
  can be delivered again, so make repeated processing safe.

For a saved publication confirmation, use
`await channel.publish('hello', { guarantee: 'persisted' })`.
This confirms storage, not completion by a subscriber.

## Handle failures

Use try/catch around operations. Errors have a `code`, such as
`message_too_large`, `deadline_exceeded` or `namespace_archived`.
The SDK retries confirmed unsent publications within their deadline. An
`outcome_unknown` means confirmation was lost; the message may already be stored,
so the SDK does not automatically send it again.

Close readers or the client when finished. Retained subscriptions keep listening
after replay reaches the newest message; they do not finish by themselves.

## Releases

Built JavaScript, TypeScript declarations and the Apache-2.0 license are included.
The import name remains `@alini/messaging-core`. SDK 0.1.2 works with NeonD
`ghcr.io/neonexia/neond:0.1.0-alpha.1`; upgrading the server is not required.
