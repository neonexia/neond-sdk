import { connect } from '@alini/messaging-core';

const client = await connect({
  gatewayUrl: process.env.NEOND_GATEWAY_URL ?? 'ws://127.0.0.1:8092',
  administration: { url: process.env.NEOND_ADMIN_URL ?? 'http://127.0.0.1:8080' },
  credentials: { trustedLocalSubject: 'my-agent' },
});

try {
  const namespace = await client.createNamespace('demo');
  console.log(`Connected to namespace ${namespace.id}`);
} finally {
  await client.close();
}
