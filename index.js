const got = require("got"); // HTTP library

class hubdot {
    constructor (config) {
        this.guildId = config.guildId;
        this.apiToken = config.apiToken;
        this.basePath = "https://api.hubdot.xyz/v1/";
    }

    request (endpoint = "", options = {
        "searchParams": {},
        "json": {}
    }) {
        const url = `${this.basePath}${endpoint}`;

        if (options.method === "GET") {
            var searchParams = {
                "guildId": this.guildId,
                "apiToken": this.apiToken,
                ...options.searchParams
            };
            searchParams = Object.keys(searchParams).map(function(key) {
                return key + '=' + searchParams[key]
            }).join('&');
            delete options["searchParams"];

            return new Promise((res, rej) => {
                got(`${url}?${searchParams}`, options)
                    .then((res1) => {
                        if (/^[\],:{}\s]*$/.test(res1.body.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                            res(JSON.parse(res1.body));
                        } else {
                            res(res1.body);
                        }
                    })
                    .catch((err) => {
                        rej(err);
                    });
            });
        } else if (options.method === "POST") {
            options.json = {
                "guildId": this.guildId,
                "apiToken": this.apiToken,
                ...options.json
            };

            return new Promise((res, rej) => {
                got.post(url, options)
                    .then((res1) => {
                        res(res1.body);
                    })
                    .catch((err) => {
                        rej(err);
                    });
            });
        }
    }

    // Fetch hub
    fetchHub () {
        return this.request("hub/fetch", {
            "method": "GET"
        });
    }

    // Delete hub
    deleteHub () {
        return this.request("hub/delete", {
            "method": "POST"
        });
    }

    // Update hub
    updateHub (update = {
        "name": "",
        "placeId": "",
        "theme": "",
        "music": []
    }) {
        return this.request("hub/update", {
            "method": "POST",
            "json": {
                update
            }
        });
    }

    // Fetch product
    fetchProduct (name = "") {
        return this.request("product/fetch", {
            "method": "GET",
            "searchParams": {
                name
            }
        });
    }

    // Create product
    createProduct (name = "", description = "", developerProductId = "", downloadUrl = "") {
        return this.request("product/create", {
            "method": "POST",
            "json": {
                name,
                description,
                developerProductId,
                downloadUrl
            }
        });
    }

    // Delete product
    deleteProduct (name = "") {
        return this.request("product/delete", {
            "method": "POST",
            "json": {
                name
            }
        });
    }

    // Update product
    updateProduct (name = "", update = {
        "name": "",
        "description": "",
        "developerProductId": "",
        "downloadUrl": ""
    }) {
        return this.request("product/update", {
            "method": "POST",
            "json": {
                name,
                update
            }
        });
    }

    // Give product
    giveProduct (name = "", discordUserId = "") {
        return this.request("product/give", {
            "method": "POST",
            "json": {
                name,
                discordUserId
            }
        });
    }

    // Revoke product
    revokeProduct (name = "", discordUserId = "") {
        return this.request("product/revoke", {
            "method": "POST",
            "json": {
                name,
                discordUserId
            }
        });
    }

    // Fetch user
    fetchUser (userId = "", type = "") {
        if (type.toLowerCase() === "discord") {
            return this.request("user/fetch", {
                "method": "GET",
                "searchParams": {
                    "discordUserId": userId
                }
            });
        } else if (type.toLowerCase() === "roblox") {
            return this.request("user/fetch", {
                "method": "GET",
                "searchParams": {
                    "robloxUserId": userId
                }
            });
        } else {
            throw "Invalid type";
        }
    }

    // Create user
    createUser (discordUserId = "") {
        return this.request("user/create", {
            "method": "POST",
            "json": {
                "userId": discordUserId
            }
        });
    }

    // Fetch user's products
    fetchUserProducts (robloxUserId = "") {
        return this.request("user/products", {
            "method": "GET",
            "searchParams": {
                robloxUserId
            }
        });
    }
}

module.exports = hubdot;

console.log("Hubdot Server: https://discord.gg/XVqmUKzE")
