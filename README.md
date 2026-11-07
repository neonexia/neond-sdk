# NeonD SDK

The public, built Node.js SDK for NeonD. Requires Node.js 24.

```sh
npm install https://github.com/neonexia/neond-sdk/releases/download/v0.1.0/neond-sdk-0.1.0.tgz
```

Import the public API:

```js
import { connect } from '@alini/messaging-core';
```

The existing package name is retained so applications keep the same API.
The `private` package flag prevents accidental npm-registry publication; it does
not prevent installation from this release URL. No npm-registry account is needed.

This release contains compiled JavaScript, TypeScript declarations, README and
Apache-2.0 license only. It is the exact SDK shipped in NeonD 0.1.0-alpha.1
(image index `sha256:e90114920a9a4a4d6ac3f25cbb5a639bc15a79a196d79fd7bffd8e9e7d792a17`),
built from runtime revision `703e075b9a66c8256544749f08e847a1e0116f6c`.
The packaged README predates public distribution; this release page supersedes
its unpublished-status sentence. The tarball is unchanged from the qualified image.

Run NeonD locally:

```sh
docker run -d --name neond -p 127.0.0.1:8080:8080 -p 127.0.0.1:8092:8092 -v neond-data:/data ghcr.io/neonexia/neond:0.1.0-alpha.1
```

Namespaces are provisioned through NeonD administration. The SDK creates channels
inside an existing namespace. See `hello.mjs` for a first publish/subscribe example.
