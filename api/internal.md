---
title: Internal
parent: Api
---
	
## Table of contents
{: .no_toc .text-delta }
1. TOC
{:toc}
---

# All Shared Emotes
GET `https://api-staging.betterbri.me/internal/library` 

Example Response

```json
[
    {
        "code":"MODS",
        "id":"tlTGlsw",
        "created_at":"2021-06-16T10:03:24.000Z",
        "owner":"xanax"
    },
    {
        "code":"peepoWTF",
        "id":"np5tcGg",
        "created_at":"2021-06-16T10:03:24.000Z",
        "owner":"xanax"
    },
    {
        "code":"peepoRus",
        "id":"HSpZoyD",
        "created_at":"2021-06-21T23:23:33.000Z",
        "owner":"xanax"
    },
    {
        "code":"Zaeb",
        "id":"9GV0t0l",
        "created_at":"2021-06-21T23:34:17.000Z",
        "owner":"xanax"
    },
    {
        "code":"WeirdChamp",
        "id":"AUccuYE",
        "created_at":"2021-06-21T23:34:28.000Z",
        "owner":"xanax"
    }
]
```
# Emote Information
GET `https://api-staging.betterbri.me/internal/emote/:emoteID` 

### PARAMS
- emoteID

Example Response

```json
{
	"name":"AYAYA",
	"imgur_id":"it97Uir",
	"created_at":"2021-07-05T10:42:00.000Z",
	"owner":"xanax"
}
```

# Shared Emotes by User
GET `https://api-staging.betterbri.me/internal/created/:userID` 

### PARAMS
- userID

Example Response

```json
[
	{
		"name":"Breh",
		"imgur_id":"jyXwjFM",
		"created_at":"2021-07-25T04:24:44.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"LULZ",
		"imgur_id":"SwU6toM",
		"created_at":"2021-07-25T04:26:11.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"KEKZ",
		"imgur_id":"NSj9QyB",
		"created_at":"2021-07-25T04:27:47.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"Kreygasm",
		"imgur_id":"9ZzZlL6",
		"created_at":"2021-07-25T04:29:13.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"AHHH",
		"imgur_id":"vOWc6YJ",
		"created_at":"2021-07-25T04:31:33.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"PogChamp",
		"imgur_id":"PkUUwnK",
		"created_at":"2021-07-25T04:33:09.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"FeelsMysticMan",
		"imgur_id":"qw2TyoF",
		"created_at":"2021-07-26T02:11:04.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"BrimesGame",
		"imgur_id":"XsFSrF9",
		"created_at":"2021-07-26T04:22:42.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"Vibez",
		"imgur_id":"UjA0C23",
		"created_at":"2021-07-26T04:53:27.000Z",
		"owner":"mystic_lulz"
	},
	{
		"name":"BrimeHYPER",
		"imgur_id":"VgJ0Ipi",
		"created_at":"2021-07-26T11:19:12.000Z",
		"owner":"mystic_lulz"
	}
]
```