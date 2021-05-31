<div align="center">
    <h1>hubdot</h1>
    <img alt="npm Version" src="https://img.shields.io/npm/v/hubdot?style=for-the-badge">
    <img alt="npm Downloads" src="https://img.shields.io/npm/dw/hubdot?style=for-the-badge">
    <br>
</div>

## Table of contents
- [Table of contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Example usage](#example-usage)
- [Links](#links)
- [Contributing](#contributing)

## About

hubdot is the official [Node.js](https://nodejs.org/) module for interacting with the hubdot API.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install hubdot:

```bash
npm install hubdot
```

## Example usage

```javascript
const hubdot = require("hubdot");
const api = new hubdot({
    "guildId": "1234567890",
    "apiToken": "abcDeFgHijKlMnOpQrSUvWxYz"
});

api.fetchUser("348853688179359746", "discord").then((user) => {
    console.log(user.robloxUserId); // 79291163
});
```

## Links

- [Wiki/Documentation](https://docs.hubdot.xyz/node.js-module/installation)
- [npm](https://www.npmjs.com/package/hubdot)
- [GitHub](https://github.com/MoaufmKlo/hubdot)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
